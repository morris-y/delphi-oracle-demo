import Image from "next/image"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ExtensionPopup() {
  return (
    <div className="w-[400px] bg-black">
      {/* Extension Header */}
      <div className="p-3 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LT2xCTTklONdiaBTLCBbTGwLgubUR5.png"
              alt="Delphi Oracle Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-white text-sm font-medium">Delphi Oracle</span>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-zinc-400 hover:text-white hover:bg-zinc-800">
          Summarize
        </Button>
      </div>

      {/* Search Area */}
      <div className="p-4">
        <div className="relative">
          <Input
            placeholder="Ask anything..."
            className="bg-zinc-900 border-zinc-800 py-5 pl-11 pr-16 text-white text-base rounded-lg placeholder:text-zinc-500"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-zinc-400 hover:text-white hover:bg-zinc-800 px-2.5 text-sm"
            >
              <Search className="h-3.5 w-3.5 mr-1.5" />
              Focus
            </Button>
            <Button size="icon" className="h-7 w-7 bg-primary hover:bg-blue-600">
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

