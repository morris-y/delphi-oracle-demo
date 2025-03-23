"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTrackedQuestions } from "@/hooks/use-tracked-questions"
import { formatDate } from "@/lib/database"
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

export default function TrackedQuestionsPage() {
  const { trackedQuestions, deleteTrackedQuestion } = useTrackedQuestions()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredQuestions = searchQuery
    ? trackedQuestions.filter((q) => q.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : trackedQuestions

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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-primary hover:text-blue-400 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-6">All Tracked Questions</h1>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search tracked questions..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
          </div>

          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <Card key={question.id} className="bg-zinc-900 border-zinc-800 p-4 hover:bg-zinc-800 transition">
                  <div className="flex justify-between items-start">
                    <Link href={`/?question=${question.id}`} className="flex-1">
                      <div className="cursor-pointer">
                        <h3 className="font-medium mb-2">{question.title}</h3>
                        <div className="flex items-center text-xs text-zinc-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Last updated: {formatDate(question.lastUpdated)}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2">
                      {question.isUpdated && (
                        <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">Updated</div>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-zinc-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-zinc-900 border-zinc-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Delete Tracked Question</AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-400">
                              Are you sure you want to stop tracking "{question.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTrackedQuestion(question.id);
                                console.log(`删除了问题: ${question.title}`);
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-zinc-400">No tracked questions found.</p>
                <Link href="/">
                  <Button className="mt-4 bg-primary hover:bg-blue-600">Go Back and Track Questions</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

