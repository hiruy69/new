'use client'

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from 'lucide-react'
import { Eye, Languages, MoonStar, GraduationCap, Baby, Syringe, Puzzle, MessageSquare, Heart, Dog, Wine, Cigarette, Dumbbell, Coffee, Bed, Sun } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SettingItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  isNew?: boolean
  percentage?: string
  section?: string
  action?: React.ReactNode
  options?: string[]
}

const settingItems: SettingItem[] = [
  { icon: Eye, label: "Open to:", isNew: false, section: "Relationship type", options: ["Relationship", "Something casual", "Not sure yet"] },
  { icon: Languages, label: "Add languages", section: "Languages I know", isNew: true },
  { icon: MoonStar, label: "Zodiac", section: "More about me", isNew: true, options: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
  { icon: GraduationCap, label: "Education" },
  { icon: Baby, label: "Family plans", options: ["Want someday", "Don't want", "Have and want more", "Have and don't want more", "Not sure yet"] },
  { icon: Syringe, label: "COVID vaccine", options: ["Vaccinated", "Not vaccinated", "Prefer not to say"] },
  { icon: Puzzle, label: "Personality type" },
  { icon: MessageSquare, label: "Communication style" },
  { icon: Heart, label: "Love style" },
  { icon: Dog, label: "Pets", section: "Lifestyle", isNew: true, options: ["Dog", "Cat", "Reptile", "Amphibian", "Bird", "Fish", "Don't have but love", "Allergic to pets", "Don't want"] },
  { icon: Wine, label: "Drinking", options: ["Frequently", "Socially", "Rarely", "Never", "Sober"] },
  { icon: Cigarette, label: "Smoking", options: ["Social smoker", "Smoker when drinking", "Non-smoker", "Smoker", "Trying to quit"] },
  { icon: Dumbbell, label: "Workout" },
  { icon: Coffee, label: "Social media" },
  { icon: Bed, label: "Looking for" },
  { icon: Sun, label: "Theme", action: <ThemeToggle />, section: "App Settings" },
]

export default function Settings() {
  let currentSection = ""
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  const handleOptionSelect = (label: string, option: string) => {
    setSelectedOptions(prev => ({ ...prev, [label]: option }))
    setOpenDialog(null)
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="flex items-center justify-between border-b p-4">
        <div className="text-xl font-semibold">Edit Info</div>
        <div className="text-xl text-muted-foreground">Preview</div>
      </div>
      <div className="divide-y">
        {settingItems.map((item, index) => {
          const showSection = item.section && item.section !== currentSection
          currentSection = item.section || currentSection
          
          return (
            <div key={index}>
              {showSection && (
                <div className="flex items-center gap-2 bg-muted px-4 py-3">
                  <span className="text-sm font-medium">{item.section}</span>
                  {item.isNew && (
                    <Badge variant="destructive" className="rounded-md px-2 py-0 text-xs">
                      New
                    </Badge>
                  )}
                  {item.percentage && <span className="ml-auto text-sm text-rose-500">{item.percentage}</span>}
                </div>
              )}
              <div className="flex items-center justify-between px-4 py-3 hover:bg-accent">
                <div className="flex items-center gap-3">
                  <item.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.action ? (
                  item.action
                ) : (
                  <Dialog open={openDialog === item.label} onOpenChange={(isOpen) => setOpenDialog(isOpen ? item.label : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="p-0">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {selectedOptions[item.label] || "Add"}
                          </span>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{item.label}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {item.options ? (
                          item.options.map((option, optionIndex) => (
                            <Button
                              key={optionIndex}
                              variant="outline"
                              onClick={() => handleOptionSelect(item.label, option)}
                            >
                              {option}
                            </Button>
                          ))
                        ) : (
                          <div className="grid gap-4">
                            <Label htmlFor={`${item.label}-input`}>{item.label}</Label>
                            <Input id={`${item.label}-input`} placeholder={`Enter your ${item.label.toLowerCase()}`} />
                            <Button onClick={() => setOpenDialog(null)}>Save</Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

