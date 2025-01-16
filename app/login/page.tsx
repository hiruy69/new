'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/contexts/auth-context'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials with your backend
    // For demo purposes, we'll just use a dummy token
    login('dummy_token')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/placeholder.svg"
            alt="Tinder"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-[#fe3f61] hover:bg-[#fe3f61]/90">
              Sign in
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          <Link href="/register" className="text-[#fe3f61] hover:text-[#fe3f61]/90">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

