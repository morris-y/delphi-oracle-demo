import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight, X, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ChromeExtension() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100 p-8">
      <div className="w-full max-w-2xl">
        {/* Back to Main App Link */}
        <div className="mb-4 text-center">
          <Link href="/" className="text-primary hover:text-blue-600 flex items-center justify-center gap-1">
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Main App</span>
          </Link>
        </div>

        {/* Chrome Extension Preview */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-zinc-800 mb-2">Chrome Extension Preview</h2>
          <div className="flex justify-center gap-4">
            <Link href="/popup" className="text-primary hover:text-blue-600">
              View Popup Interface
            </Link>
            <span className="text-zinc-300">|</span>
            <Link href="/popup" className="text-primary hover:text-blue-600">
              View Full Interface
            </Link>
          </div>
        </div>

        {/* Chrome Extension UI */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-zinc-200">
          {/* Extension Header */}
          <div className="bg-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LT2xCTTklONdiaBTLCBbTGwLgubUR5.png"
                  alt="Delphi Oracle Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-white text-lg font-medium">Delphi Oracle</h1>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                    Mode <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-zinc-900 border-zinc-800">
                  <DropdownMenuItem className="text-white focus:bg-zinc-800 focus:text-white">
                    Quick Ask
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white focus:bg-zinc-800 focus:text-white">
                    Research
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white focus:bg-zinc-800 focus:text-white">
                    Summarize
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-black min-h-[400px]">
            <div className="p-6">
              {/* Search Input */}
              <div className="relative mb-6">
                <Input
                  placeholder="Ask about Web3, crypto, or this page..."
                  className="bg-zinc-900 border-zinc-800 py-6 pl-12 pr-16 text-white text-lg rounded-xl placeholder:text-zinc-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 px-3"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Focus
                  </Button>
                  <Button size="icon" className="h-8 w-8 bg-primary hover:bg-blue-600">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 text-sm text-zinc-400">
                <p className="font-medium mb-3">Page Context</p>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition group">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Analyze current page content</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition group">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span>Search within this website</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extension Label */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-zinc-800">Delphi Oracle Chrome Extension</h2>
          <p className="text-zinc-600 text-sm mt-1">Access Web3 intelligence anywhere on the web</p>
          <div className="mt-3">
            <Button className="bg-primary hover:bg-blue-600">Install Extension</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

