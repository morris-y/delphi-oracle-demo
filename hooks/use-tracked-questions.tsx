"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { type TrackedQuestion, initialTrackedQuestions } from "@/lib/database"

export function useTrackedQuestions() {
  // Initialize state with data from localStorage or default data
  const [trackedQuestions, setTrackedQuestions] = useState<TrackedQuestion[]>([])

  // Load tracked questions from localStorage on component mount
  useEffect(() => {
    const storedQuestions = localStorage.getItem("trackedQuestions")
    if (storedQuestions) {
      setTrackedQuestions(JSON.parse(storedQuestions))
    } else {
      setTrackedQuestions(initialTrackedQuestions)
      localStorage.setItem("trackedQuestions", JSON.stringify(initialTrackedQuestions))
    }
  }, [])

  // Function to track a new question - memoized with useCallback
  const trackQuestion = useCallback((id: string, title: string) => {
    const now = new Date().toISOString()
    const newQuestion: TrackedQuestion = {
      id,
      title,
      lastChecked: now,
      lastUpdated: now,
      isUpdated: false,
    }

    setTrackedQuestions((prevQuestions) => {
      // Check if question is already tracked
      const exists = prevQuestions.some((q) => q.id === id)
      if (!exists) {
        const updatedQuestions = [...prevQuestions, newQuestion]
        localStorage.setItem("trackedQuestions", JSON.stringify(updatedQuestions))
        return updatedQuestions
      }
      return prevQuestions
    })
  }, [])

  // Function to delete a tracked question
  const deleteTrackedQuestion = useCallback((id: string) => {
    setTrackedQuestions((prevQuestions) => {
      // 确保我们找到了需要删除的问题
      const questionToDelete = prevQuestions.find(q => q.id === id);
      if (!questionToDelete) {
        console.warn(`Question with id ${id} not found for deletion`);
        return prevQuestions;
      }
      
      // 过滤出不匹配的问题，实际上是删除匹配的问题
      const updatedQuestions = prevQuestions.filter((q) => q.id !== id);
      
      // 确保更新 localStorage 
      try {
        localStorage.setItem("trackedQuestions", JSON.stringify(updatedQuestions));
        console.log(`Successfully deleted question with id ${id}`);
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
      
      return updatedQuestions;
    });
  }, []);

  // Function to get only updated questions
  const getUpdatedQuestions = useCallback(() => {
    return trackedQuestions.filter((q) => q.isUpdated)
  }, [trackedQuestions])

  // Function to mark a question as viewed (remove updated status) - memoized with useCallback
  const markAsViewed = useCallback((id: string) => {
    setTrackedQuestions((prevQuestions) => {
      // Only update if the question exists and is marked as updated
      const question = prevQuestions.find((q) => q.id === id)
      if (question && question.isUpdated) {
        const updatedQuestions = prevQuestions.map((q) => (q.id === id ? { ...q, isUpdated: false } : q))
        localStorage.setItem("trackedQuestions", JSON.stringify(updatedQuestions))
        return updatedQuestions
      }
      return prevQuestions
    })
  }, [])

  // Check if a question is updated
  const isQuestionUpdated = useCallback(
    (id: string) => {
      const question = trackedQuestions.find((q) => q.id === id)
      return question ? question.isUpdated : false
    },
    [trackedQuestions],
  )

  // Memoize the return value to prevent unnecessary re-renders
  const returnValue = useMemo(
    () => ({
      trackedQuestions,
      trackQuestion,
      deleteTrackedQuestion,
      getUpdatedQuestions,
      markAsViewed,
      isQuestionUpdated,
    }),
    [trackedQuestions, trackQuestion, deleteTrackedQuestion, getUpdatedQuestions, markAsViewed, isQuestionUpdated],
  )

  return returnValue
}

