export interface User {
  id: string
  name: string
  age: number
  images: string[]
  bio: string
  interests: string[]
  verified?: boolean
  distance?: number
  lastActive?: string
}

export interface Match {
  id: string
  users: [string, string]
  timestamp: number
  lastMessage?: Message
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: number
  read: boolean
}

