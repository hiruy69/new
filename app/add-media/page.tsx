'use client'

import { useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Plus, X, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"

export default function AddMedia() {
  const [activeTab, setActiveTab] = useState("edit")
  const [images, setImages] = useState<(string | null)[]>([
    "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
    "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.onchange = (event) => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files[0]) {
          const file = target.files[0]
          const reader = new FileReader()
          reader.onload = (e) => {
            const newImages = [...images]
            newImages[index] = e.target?.result as string
            setImages(newImages)
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages[index] = null
    setImages(newImages)
  }

  const nonNullImages = images.filter((img): img is string => img !== null)

  const handlePreviewNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPreviewIndex > 0) {
      setCurrentPreviewIndex(prev => prev - 1)
    } else if (direction === 'next' && currentPreviewIndex < nonNullImages.length - 1) {
      setCurrentPreviewIndex(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="edit"
            className={`text-base sm:text-lg ${activeTab === "edit" ? "text-rose-500" : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </TabsTrigger>
          <TabsTrigger 
            value="preview"
            className={`text-base sm:text-lg ${activeTab === "preview" ? "text-rose-500" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="mt-0">
          <div className="grid grid-cols-3 gap-1 p-1 sm:gap-2 sm:p-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-200"
              >
                {image ? (
                  <div className="group relative h-full w-full">
                    <Image
                      src={image || "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png"}
                      alt={`Upload ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleImageUpload(index)}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <Plus className="h-6 w-6 text-rose-500 sm:h-8 sm:w-8" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          {nonNullImages.length > 0 && (
            <div className="container mx-auto max-w-lg">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <Image
                  src={nonNullImages[currentPreviewIndex] || "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Luna</h2>
                      <span className="text-xl text-white sm:text-2xl">23</span>
                    </div>
                    <button className="rounded-full bg-black/20 p-2">
                      <Info className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
                {nonNullImages.length > 1 && (
                  <>
                    <div className="absolute inset-y-0 left-0 flex w-1/4 items-center justify-start px-2">
                      {currentPreviewIndex > 0 && (
                        <button
                          onClick={() => handlePreviewNavigation('prev')}
                          className="rounded-full bg-black/40 p-1 text-white backdrop-blur-sm"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                      )}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex w-1/4 items-center justify-end px-2">
                      {currentPreviewIndex < nonNullImages.length - 1 && (
                        <button
                          onClick={() => handlePreviewNavigation('next')}
                          className="rounded-full bg-black/40 p-1 text-white backdrop-blur-sm"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      )}
                    </div>
                    <div className="absolute top-2 flex w-full justify-center gap-1">
                      {nonNullImages.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all ${
                            index === currentPreviewIndex 
                              ? 'w-6 bg-white' 
                              : 'w-1 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="container mx-auto max-w-lg px-4 pt-6 sm:px-6 sm:pt-8">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Add a video, pic or Loop to get 4% closer to completing
          your profile and you may even get more Likes.
        </p>
        <Button 
          className="mt-4 w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 py-4 text-base font-semibold text-white sm:py-6 sm:text-lg"
          onClick={() => handleImageUpload(images.findIndex(img => img === null))}
        >
          Add media
        </Button>
        <div className="mt-6 flex items-center justify-between px-4">
          <span className="text-base sm:text-lg">Smart Photos</span>
          <Switch />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
      />
    </div>
  )
}

