"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Star,
  Clock,
  Share2,
  ThumbsUp,
  Bell,
  ArrowRight,
  ExternalLink,
  Bookmark,
  Send,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTrackedQuestions } from "@/hooks/use-tracked-questions"
import { questions, formatDate, getTimeAgo, Question } from "@/lib/database"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Home() {
  const searchParams = useSearchParams()
  const questionId = searchParams.get("question")

  const {
    trackQuestion,
    getUpdatedQuestions,
    trackedQuestions,
    markAsViewed,
    isQuestionUpdated,
    deleteTrackedQuestion,
  } = useTrackedQuestions()

  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [activeTab, setActiveTab] = useState("chat")
  const updatedQuestions = useMemo(() => getUpdatedQuestions(), [getUpdatedQuestions])

  // Set current question based on URL parameter
  useEffect(() => {
    if (questionId) {
      const question = questions.find((q) => q.id === questionId)
      if (question) {
        setCurrentQuestion(question)

        // Only mark as viewed if it's actually updated
        if (isQuestionUpdated(questionId)) {
          markAsViewed(questionId)
        }
      }
    }
  }, [questionId, isQuestionUpdated, markAsViewed])

  // Handle tracking a question
  const handleTrackQuestion = () => {
    trackQuestion(currentQuestion.id, currentQuestion.title)
    alert(`"${currentQuestion.title}" is now being tracked daily.`)
  }

  // Handle clicking on an updated question
  const handleQuestionClick = (id: string) => {
    const question = questions.find((q) => q.id === id)
    if (question) {
      setCurrentQuestion(question)
      setActiveTab("chat")

      // Only mark as viewed if it's actually updated
      if (isQuestionUpdated(id)) {
        markAsViewed(id)
      }
    }
  }

  // Handle clicking on a prompt suggestion
  const handlePromptClick = (question: Question) => {
    setCurrentQuestion(question)
    setActiveTab("chat")
  }

  // Memoize the top questions to prevent unnecessary re-renders
  const topQuestions = useMemo(
    () => [
      { q: "What's the best L2 for DeFi right now?", likes: 243 },
      { q: "Compare Base vs Optimism growth metrics", likes: 187 },
      { q: "Explain the recent Solana price movement", likes: 156 },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LT2xCTTklONdiaBTLCBbTGwLgubUR5.png"
                alt="Delphi Oracle Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold">Delphi Oracle</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Sidebar - 在移动端使用order-2放到后面，在桌面端使用order-1放回前面 */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <Card className="bg-zinc-900 border-zinc-800 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Updated Tracked Questions</h2>
              <div className="space-y-3 sm:space-y-5">
                {updatedQuestions.length > 0 ? (
                  updatedQuestions.map((question) => (
                    <div key={question.id} className="p-3 sm:p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <p className="text-xs sm:text-sm cursor-pointer" onClick={() => handleQuestionClick(question.id)}>
                          {question.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5">Updated</Badge>
                        </div>
                      </div>
                      <div
                        className="flex items-center text-[10px] sm:text-xs text-zinc-400"
                        onClick={() => handleQuestionClick(question.id)}
                      >
                        <Clock className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        <span>Updated {formatDate(question.lastUpdated)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 text-xs sm:text-sm py-2">
                    No updated questions yet. Track questions to receive updates.
                  </p>
                )}

                <div className="mt-2">
                  <Link href="/tracked-questions">
                    <Button
                      variant="outline"
                      className="w-full text-xs sm:text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-700 py-1 sm:py-2"
                    >
                      View All Tracked Questions
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Top Questions</h2>
              <div className="space-y-2 sm:space-y-3">
                {topQuestions.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer transition"
                  >
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-400" />
                      <span className="text-[10px] sm:text-xs mt-1">{item.likes}</span>
                    </div>
                    <p className="text-xs sm:text-sm">{item.q}</p>
                  </div>
                ))}
                <div className="mt-2">
                  <Button
                    variant="outline"
                    className="w-full text-xs sm:text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-700 py-1 sm:py-2"
                  >
                    View Leaderboard
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Delphi Oracle</h1>
              <p className="text-sm sm:text-base text-zinc-400">
                Your dynamic Web3 intelligence tool that tracks market changes and keeps you informed
              </p>

              {/* Chrome Extension Promo - 在移动端隐藏 */}
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-zinc-900 rounded-lg border border-zinc-800 hidden sm:flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="h-8 w-8 relative mr-3">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LT2xCTTklONdiaBTLCBbTGwLgubUR5.png"
                      alt="Delphi Oracle Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Try our Chrome Extension</h3>
                    <p className="text-sm text-zinc-400">Access Delphi Oracle anywhere on the web</p>
                  </div>
                </div>
                <Link href="/chrome-extension">
                  <Button className="bg-primary hover:bg-blue-600 w-full sm:w-auto">View Extension</Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Input
                placeholder="Ask about Web3 trends, tokens, or projects..."
                className="bg-zinc-900 border-zinc-700 py-4 sm:py-6 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base"
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4 sm:h-5 sm:w-5" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-blue-600 h-8 w-8 sm:h-10 sm:w-10">
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 sm:p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 cursor-pointer transition"
                  onClick={() => handlePromptClick(q)}
                >
                  <p className="text-xs sm:text-sm">{q.title}</p>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-500 flex-shrink-0 ml-2" />
                </div>
              ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 sm:mt-8">
              <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start h-auto">
                <TabsTrigger value="chat" className="data-[state=active]:bg-zinc-800 text-xs sm:text-sm py-1.5 sm:py-2">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="tracked" className="data-[state=active]:bg-zinc-800 text-xs sm:text-sm py-1.5 sm:py-2">
                  Tracked Questions
                </TabsTrigger>
                <TabsTrigger value="community" className="data-[state=active]:bg-zinc-800 text-xs sm:text-sm py-1.5 sm:py-2">
                  Community
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-3 sm:mt-4">
                <Card className="bg-zinc-900 border-zinc-800 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 sm:h-8 sm:w-8 bg-primary rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium">{currentQuestion.title}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs h-8"
                        onClick={handleTrackQuestion}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Track Daily
                      </Button>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs h-8">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs h-8">
                        <Bookmark className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm mb-3 whitespace-pre-line">{currentQuestion.content}</p>
                    <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-zinc-700">
                      <p className="text-xs text-zinc-400">
                        Last updated: {getTimeAgo(currentQuestion.lastUpdated)} ·{" "}
                        <span className="text-blue-400 cursor-pointer">View full report</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-3 sm:p-4">
                    <h4 className="text-xs sm:text-sm font-medium mb-2">Sources & Citations</h4>
                    <div className="space-y-2">
                      {currentQuestion.sources.map((source, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 bg-zinc-700 rounded">
                          <span className="text-[10px] sm:text-xs">{source}</span>
                          <ExternalLink className="h-3 w-3 text-zinc-400 ml-1 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="tracked" className="mt-3 sm:mt-4">
                <Card className="bg-zinc-900 border-zinc-800 p-4 sm:p-6">
                  {trackedQuestions.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {trackedQuestions.map((question) => (
                        <div key={question.id} className="p-2 sm:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
                          <div className="flex justify-between items-start">
                            <p className="text-xs sm:text-sm cursor-pointer" onClick={() => handleQuestionClick(question.id)}>
                              {question.title}
                            </p>
                            <div className="flex items-center gap-2">
                              {question.isUpdated && <Badge className="bg-green-600 text-[10px] sm:text-xs px-1.5 py-0.5">Updated</Badge>}
                            </div>
                          </div>
                          <div
                            className="flex items-center mt-2 text-[10px] sm:text-xs text-zinc-400 cursor-pointer"
                            onClick={() => handleQuestionClick(question.id)}
                          >
                            <Clock className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                            <span>Last updated: {formatDate(question.lastUpdated)}</span>
                          </div>
                        </div>
                      ))}
                      <div className="mt-2">
                        <Link href="/tracked-questions">
                          <Button
                            variant="outline"
                            className="w-full text-xs sm:text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-700 py-1 sm:py-2"
                          >
                            View All Tracked Questions
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-zinc-400 text-xs sm:text-sm mb-3 sm:mb-4">You haven't tracked any questions yet.</p>
                      <p className="text-zinc-400 text-xs sm:text-sm mb-3 sm:mb-4">
                        Click the "Track Daily" button on any question to start receiving updates.
                      </p>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="community" className="mt-3 sm:mt-4">
                <Card className="bg-zinc-900 border-zinc-800 p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-zinc-400">Explore popular questions from the community.</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

