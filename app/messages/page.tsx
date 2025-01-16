import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const messages = [
  {
    id: "1",
    name: "Sachia",
    avatar: "/placeholder.svg",
    message: "Recently active, match now!",
    isOnline: true,
    likesYou: true
  },
  {
    id: "2",
    name: "Shain",
    avatar: "/placeholder.svg",
    message: "Hey, what's up with dog pics?",
    isOnline: false
  }
]

export default function Messages() {
  return (
    <div className="container mx-auto max-w-lg space-y-6 p-4 pb-32 sm:p-6 sm:pb-32">
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">New matches</h2>
        <Link href="/likes" className="mt-4 block">
          <div className="relative aspect-square w-20 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 sm:w-24">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <span className="text-xl font-bold text-amber-400 sm:text-2xl">99+</span>
            </div>
          </div>
          <p className="mt-2 font-semibold">99+ likes</p>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-bold sm:text-2xl">Messages</h2>
        <div className="mt-4 space-y-4">
          {messages.map((message) => (
            // `/messages/${message.id}`
            <Link key={message.id} href="tg://resolve?domain=kidcaz2022" className="block">
              <div className="flex items-center gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors">
                <div className="relative">
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.name[0]}</AvatarFallback>
                  </Avatar>
                  {message.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{message.name}</h3>
                    {message.likesYou && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-600">
                        Likes You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{message.message}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

