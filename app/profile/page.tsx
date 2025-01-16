'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Settings, Pencil, Camera, Plus, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { ProtectedRoute } from "@/components/protected-route"

export default function Profile() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 5

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center px-4 pt-8">
          <div className="relative">
            <div className="relative h-[120px] w-[120px]">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-gray-200 to-white dark:from-gray-700 dark:to-gray-900"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tinder%2035-07%201-WeKvVKqK8d8Oby20WnfoQiFC1BGd72.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 w-32 -translate-x-1/2 transform">
              <div className="rounded-full bg-[#fe3f61] px-4 py-1.5 text-center shadow-lg">
                <span className="text-sm font-semibold text-white">20% complete</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-[#21262e] dark:text-white">Luna, 23</h1>
            <CheckCircle className="h-5 w-5 text-[#4cc7f4]" />
          </div>

          <div className="mt-10 flex w-full max-w-md justify-between px-6">
            <Link href="/settings" className="flex flex-col items-center">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700">
                <Settings className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Settings</span>
            </Link>

            <Link href="/edit-profile" className="flex flex-col items-center">
              <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700">
                <Pencil className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#fe3f61]" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Edit profile</span>
            </Link>

            <Link href="/add-media" className="flex flex-col items-center">
              <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#fe3f61]">
                <Camera className="h-8 w-8 text-white" />
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#fe3f61] text-white shadow-lg">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Add media</span>
            </Link>
          </div>

          <div className="relative mt-24 w-full">
            <div className="wave-background absolute inset-x-0 top-0 h-80 dark:opacity-10" />
            <div className="relative z-10 flex flex-col items-center px-4">
              <h2 className="text-xl font-bold text-[#21262e] dark:text-white">Tinder Platinum™</h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Level up every action you take on Tinder
              </p>

              <div className="mt-8 flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentSlide 
                        ? 'bg-[#21262e] dark:bg-white' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span className="sr-only">Slide {index + 1}</span>
                  </button>
                ))}
              </div>

              <button className="mt-8 w-full max-w-md rounded-full bg-white px-6 py-4 text-base font-bold text-[#21262e] shadow-lg dark:bg-gray-900 dark:text-white">
                GET TINDER PLATINUM™
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

