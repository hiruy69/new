'use client'

import { useState } from "react"
import { SwipeCard } from "@/components/swipe-card"
import { ActionButtons } from "@/components/action-buttons"
import { User } from "@/types"
import { ProtectedRoute } from "@/components/protected-route"

const mockUsers: User[] = [
  {
    id: "1",
    name: "Kim",
    age: 30,
    images: [
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png"
    ],
    bio: "Living life to the fullest",
    interests: ["Photography", "Travel", "Art", "Music", "Food"],
    verified: true,
  },
  {
    id: "2",
    name: "Luna",
    age: 24,
    images: [
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png"
    ],
    bio: "Adventure seeker and coffee lover",
    interests: ["Hiking", "Photography", "Travel", "Coffee", "Yoga"],
    verified: false,
  },
  {
    id: "3",
    name: "Alex",
    age: 28,
    images: [
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png",
      "https://i.ibb.co/0rsygSg/1-Pi-Hoomzwh9-Plr9-GA26-Jc-A.png"
    ],
    bio: "Tech enthusiast and gamer",
    interests: ["Gaming", "Coding", "Sci-fi", "VR", "Robotics"],
    verified: true,
  },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<string[]>([])

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setMatches((prev) => [...prev, mockUsers[currentIndex].id])
    }
    setCurrentIndex((prev) => (prev + 1) % mockUsers.length)
  }

  const handleAction = (action: "rewind" | "dislike" | "superlike" | "like" | "boost") => {
    switch (action) {
      case "rewind":
        setCurrentIndex((prev) => (prev - 1 + mockUsers.length) % mockUsers.length)
        break
      case "dislike":
        handleSwipe("left")
        break
      case "like":
        handleSwipe("right")
        break
      case "superlike":
        handleSwipe("right")
        break
      case "boost":
        console.log("Boost activated")
        break
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto flex h-screen max-w-lg flex-col px-4 pb-20 pt-4 sm:px-6">
        <div className="relative flex-1">
          {mockUsers.map((user, index) => (
            <SwipeCard
              key={user.id}
              user={user}
              onSwipe={handleSwipe}
              isActive={index === currentIndex}
            />
          ))}
        </div>
        <div className="relative z-10 pb-4 pt-4 px-4">
          <ActionButtons
            onRewind={() => handleAction("rewind")}
            onDislike={() => handleAction("dislike")}
            onSuperlike={() => handleAction("superlike")}
            onLike={() => handleAction("like")}
            onBoost={() => handleAction("boost")}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}

