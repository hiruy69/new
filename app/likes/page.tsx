'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Heart } from 'lucide-react'

const interests = ["❤️", "Padel", "Running", "Walking", "Has bio"]

const blurredCards = Array(6).fill(null).map((_, i) => ({
  id: `card-${i}`,
  image: "/placeholder.svg"
}))

export default function Likes() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-4 sm:p-6">
        <h1 className="text-xl font-bold sm:text-2xl">99+ likes</h1>
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {interests.map((interest) => (
            <Button
              key={interest}
              variant="outline"
              className="rounded-full whitespace-nowrap text-sm sm:text-base"
            >
              {interest}
            </Button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
          {blurredCards.map((card) => (
            <div
              key={card.id}
              className="relative aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={card.image || "/placeholder.svg"}
                alt="Profile preview"
                fill
                className="object-cover blur-sm"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        <Button 
          className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 py-4 text-base font-semibold text-white sm:py-6 sm:text-lg"
        >
          See who likes you
        </Button>
      </div>
    </div>
  )
}

