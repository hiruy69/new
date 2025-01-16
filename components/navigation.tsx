'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Flame, Search, Sparkles, MessageCircle, User } from 'lucide-react'
import { cn } from "@/lib/utils"

const links = [
  { href: "/", icon: Flame },
  { href: "/explore", icon: Search },
  { href: "/top-picks", icon: Sparkles, badge: "99+" },
  { href: "/messages", icon: MessageCircle },
  { href: "/profile", icon: User },
]

export function Navigation() {
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-around p-2">
        {links.map(({ href, icon: Icon, badge }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center p-2",
              pathname === href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="relative">
              <Icon className="h-6 w-6" />
              {badge && (
                <span className="absolute -right-3 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                  {badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}

