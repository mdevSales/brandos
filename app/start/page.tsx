'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default function StartPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = async () => {
    if (!name) {
      alert('Please enter your name')
      return
    }

    setIsLoading(true)

    try {
      // Create or retrieve user
      const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: `${name.replace(/\s+/g, '_')}@workshop.local` }),
      })

      const { userId } = await response.json()

      // Save to localStorage for session management
      localStorage.setItem('brandos_session', JSON.stringify({
        userId,
        name,
        email: `${name.replace(/\s+/g, '_')}@workshop.local`,
        currentStep: 1,
      }))

      // Navigate to voice calibration
      router.push('/app/voice')
    } catch (error) {
      console.error('Error starting session:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Let's build your LinkedIn brand
          </h1>
          <p className="text-gray-600">
            This will take about 45-60 minutes. We'll guide you through each step.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What's your name?</CardTitle>
            <CardDescription>
              We'll personalize the experience and reference your name throughout.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name) {
                    handleStart()
                  }
                }}
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleStart}
                disabled={isLoading || !name}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Starting...' : 'Start Building'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-3">What to expect:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-purple-600">1.</span>
              <span>Voice Calibration - help us match your natural tone</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">2.</span>
              <span>Identity - clarify your positioning and value</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">3.</span>
              <span>Authority - highlight your wins and expertise</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">4.</span>
              <span>Perspective - define your unique viewpoint</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">5.</span>
              <span>Profile - rewrite your headline and About section</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">6.</span>
              <span>Content - generate post ideas and ready-to-use posts</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">7.</span>
              <span>Plan - get your 30-day action plan</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">8.</span>
              <span>Download - get your complete packet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
