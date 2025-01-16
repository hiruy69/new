'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types"
import { CheckCircle, MapPin, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { UserDetail } from "./user-detail"

interface SwipeCardProps {
  user: User
  onSwipe: (direction: "left" | "right") => void
  isActive: boolean
}

export function SwipeCard({ user, onSwipe, isActive }: SwipeCardProps) {
  const [exitX, setExitX] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [showDetail, setShowDetail] = useState(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  useEffect(() => {
    if (!isActive) {
      setExitX(null)
      setCurrentImageIndex(0)
      setShowDetail(false)
    }
  }, [isActive])

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      setExitX(200)
      onSwipe("right")
    } else if (info.offset.x < -100) {
      setExitX(-200)
      onSwipe("left")
    }
  }

  const handleImageNavigation = (direction: 'prev' | 'next', event: React.MouseEvent) => {
    event.stopPropagation()
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    } else if (direction === 'next' && currentImageIndex < user.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentImageIndex < user.images.length - 1) {
        setCurrentImageIndex(prev => prev + 1)
        setTouchStart(touchEnd)
      } else if (diff < 0 && currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1)
        setTouchStart(touchEnd)
      }
    }
  }

  return (
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            style={{ x, rotate, opacity }}
            drag={!showDetail ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: exitX, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-0 bottom-0 w-full"
          >
            <div 
              className="relative h-full w-full overflow-hidden rounded-xl bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <Image
                src={user.images[currentImageIndex]}
                alt={user.name}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-y-0 left-0 flex w-1/4 items-center justify-start px-2">
                {currentImageIndex > 0 && (
                  <button
                    onClick={(e) => handleImageNavigation('prev', e)}
                    className="rounded-full bg-black/40 p-1 text-white backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex w-1/4 items-center justify-end px-2">
                {currentImageIndex < user.images.length - 1 && (
                  <button
                    onClick={(e) => handleImageNavigation('next', e)}
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

              <div className="absolute left-4 top-4">
                <span className="rounded bg-black/40 px-2 py-1 text-sm text-white backdrop-blur-sm">
                  Recently Active
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent pb-6 pt-12">
                <div className="space-y-2 px-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                    <span className="text-2xl text-white">{user.age}</span>
                    {user.verified && (
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    )}
                    <button 
                      className="ml-auto rounded-full bg-black/40 p-2 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDetail(true);
                      }}
                    >
                      <Info className="h-6 w-6 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">12 kilometers away</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-black/40 text-white backdrop-blur-sm"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {showDetail && (
            <UserDetail 
              user={user} 
              onClose={() => setShowDetail(false)} 
            />
          )}
        </>
      )}
    </AnimatePresence>
  )
}

