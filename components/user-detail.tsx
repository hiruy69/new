'use client'

import { useState } from "react"
import { User } from "@/types"
import Image from "next/image"
import { MapPin, UserIcon, FrownIcon as ThinkingFace, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface UserDetailProps {
  user: User
  onClose: () => void
}

export function UserDetail({ user, onClose }: UserDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    } else if (direction === 'next' && currentImageIndex < user.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/80 overflow-hidden">
      <div className="container mx-auto h-full max-w-lg px-4 py-6 sm:px-6 flex flex-col">
        <div className="flex flex-col h-full w-full max-h-[calc(100vh-80px)] overflow-hidden">
          <ScrollArea className="flex-grow rounded-xl bg-black overflow-hidden">
            <div className="pb-16">
              <div className="relative w-full max-w-full overflow-hidden"> {/* Updated div */}
                <Image
                  src={user.images[currentImageIndex] || "/placeholder.svg"}
                  alt={user.name}
                  width={400}
                  height={533}
                  className="w-full h-auto object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white z-10"
                >
                  <ChevronDown className="h-6 w-6" />
                </button>
                <div className="absolute inset-y-0 left-0 flex w-1/4 items-center justify-start px-2">
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => handleImageNavigation('prev')}
                      className="rounded-full bg-black/40 p-1 text-white backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                  )}
                </div>
                <div className="absolute inset-y-0 right-0 flex w-1/4 items-center justify-end px-2">
                  {currentImageIndex < user.images.length - 1 && (
                    <button
                      onClick={() => handleImageNavigation('next')}
                      className="rounded-full bg-black/40 p-1 text-white backdrop-blur-sm"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  )}
                </div>
                <div className="absolute top-2 flex w-full justify-center gap-1">
                  {user.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-6 bg-white'
                          : 'w-1 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6 p-4 overflow-y-auto">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-4xl font-bold text-white">{user.name}</h1>
                    <span className="text-2xl text-white">{user.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <UserIcon className="h-4 w-4" />
                    <span>Woman</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>8 kilometers away</span>
                  </div>
                </div>

                {/* Looking For */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-400">
                    <ThinkingFace className="h-6 w-6" />
                    <span className="font-semibold">Looking for</span>
                  </div>
                  <div className="rounded-md bg-blue-950 px-4 py-2">
                    Still figuring it out
                  </div>
                </div>

                {/* Basics */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">Basics</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Capricorn
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Bachelors
                    </Badge>
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">Lifestyle</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Cat
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      On special occasions
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Non-smoker
                    </Badge>
                  </div>
                </div>

                {/* Passions */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">Passions</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Street Food
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Live Music
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Travel
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Reading
                    </Badge>
                    <Badge variant="secondary" className="rounded-full bg-zinc-800 text-white">
                      Festivals
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white"
                    onClick={() => console.log('Unmatch')}
                  >
                    Unmatch
                    <span className="ml-auto text-sm text-gray-500">
                      No longer interested? Remove them from your matches.
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white"
                    onClick={() => console.log('Block')}
                  >
                    Block Nele
                    <span className="ml-auto text-sm text-gray-500">
                      You won&apos;t see them, they won&apos;t see you.
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white"
                    onClick={() => console.log('Report')}
                  >
                    Report Nele
                    <span className="ml-auto text-sm text-gray-500">
                      Don&apos;t worry - we won&apos;t tell them.
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

