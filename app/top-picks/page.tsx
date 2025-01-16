'use client'

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, X, Star } from 'lucide-react'
import { User } from "@/types"

const topPicks: User[] = [
  {
    id: "1",
    name: "Emma",
    age: 27,
    images: ["/placeholder.svg"],
    bio: "Adventurous spirit with a love for the outdoors",
    interests: ["Hiking", "Photography", "Yoga"],
    verified: true,
  },
  {
    id: "2",
    name: "Liam",
    age: 29,
    images: ["/placeholder.svg"],
    bio: "Foodie and aspiring chef",
    interests: ["Cooking", "Wine tasting", "Traveling"],
    verified: false,
  },
  {
    id: "3",
    name: "Sophia",
    age: 25,
    images: ["/placeholder.svg"],
    bio: "Bookworm and cat lover",
    interests: ["Reading", "Writing", "Cat cafes"],
    verified: true,
  },
  {
    id: "4",
    name: "Noah",
    age: 28,
    images: ["/placeholder.svg"],
    bio: "Music enthusiast and guitarist",
    interests: ["Concerts", "Songwriting", "Vinyl collecting"],
    verified: true,
  },
]

export default function TopPicks() {
  const [picks, setPicks] = useState(topPicks)

  const handleAction = (id: string, action: "like" | "dislike" | "superlike") => {
    setPicks((prevPicks) => prevPicks.filter((pick) => pick.id !== id))
    // Here you would typically send the action to your backend
    console.log(`User ${id} ${action}d`)
  }

  return (
    <div className="container max-w-lg space-y-4 p-4 pb-32">
      <h1 className="text-2xl font-bold">Top Picks</h1>
      <p className="text-muted-foreground">These picks refresh every 24 hours. Like or pass on each one.</p>
      <div className="grid grid-cols-2 gap-4">
        {picks.map((pick) => (
          <Card key={pick.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={pick.images[0] || "/placeholder.svg"}
                  alt={pick.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{pick.name}, {pick.age}</h3>
                  {pick.verified && <Badge variant="secondary">Verified</Badge>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{pick.bio}</p>
                <div className="mt-4 flex justify-between">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleAction(pick.id, "dislike")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleAction(pick.id, "superlike")}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleAction(pick.id, "like")}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

