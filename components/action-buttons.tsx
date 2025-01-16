'use client'

import { Button } from "@/components/ui/button"
import { RotateCcw, X, Star, Heart, Zap } from 'lucide-react'

interface ActionButtonsProps {
  onRewind?: () => void
  onDislike?: () => void
  onSuperlike?: () => void
  onLike?: () => void
  onBoost?: () => void
  className?: string
}

export function ActionButtons({
  onRewind,
  onDislike,
  onSuperlike,
  onLike,
  onBoost,
  className = ""
}: ActionButtonsProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <Button
        size="icon"
        variant="outline"
        className="h-14 w-14 rounded-full border-[3px] border-orange-400 bg-black/40 text-orange-400 backdrop-blur-sm transition-colors hover:bg-orange-400 hover:text-white sm:h-16 sm:w-16"
        onClick={onRewind}
      >
        <RotateCcw className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-16 w-16 rounded-full border-[3px] border-rose-500 bg-black/40 text-rose-500 backdrop-blur-sm transition-colors hover:bg-rose-500 hover:text-white sm:h-20 sm:w-20"
        onClick={onDislike}
      >
        <X className="h-8 w-8 sm:h-10 sm:w-10" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-14 w-14 rounded-full border-[3px] border-blue-500 bg-black/40 text-blue-500 backdrop-blur-sm transition-colors hover:bg-blue-500 hover:text-white sm:h-16 sm:w-16"
        onClick={onSuperlike}
      >
        <Star className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-16 w-16 rounded-full border-[3px] border-green-500 bg-black/40 text-green-500 backdrop-blur-sm transition-colors hover:bg-green-500 hover:text-white sm:h-20 sm:w-20"
        onClick={onLike}
      >
        <Heart className="h-8 w-8 sm:h-10 sm:w-10" />
      </Button>
      {/* <Button
        size="icon"
        variant="outline"
        className="h-14 w-14 rounded-full border-[3px] border-purple-500 bg-black/40 text-purple-500 backdrop-blur-sm transition-colors hover:bg-purple-500 hover:text-white sm:h-16 sm:w-16"
        onClick={onBoost}
      >
        <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button> */}
    </div>
  )
}

