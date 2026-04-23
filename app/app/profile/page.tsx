'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../../context/session-context'
import { StepWrapper } from '@/components/step-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [formData, setFormData] = useState({
    currentHeadline: '',
    currentAbout: '',
    experience: '',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<any>(null)

  const handleGenerate = async () => {
    if (!formData.currentHeadline && !formData.currentAbout) {
      alert('Please provide your current headline or About section')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: formData,
          voice: session.voice,
        }),
      })

      const data = await response.json()
      setOutputs(data)

      updateSession({
        profile: formData,
        profileOutputs: data,
      })
    } catch (error) {
      console.error('Error generating profile outputs:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (!outputs) {
      alert('Please generate your profile rewrite first')
      return
    }

    updateSession({ currentStep: 6 })
    router.push('/app/content')
  }

  return (
    <StepWrapper
      title="Profile Rewrite"
      description="Let's make your LinkedIn profile compelling and clear. This is often the first thing people see."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentHeadline">Your Current LinkedIn Headline</Label>
          <Input
            id="currentHeadline"
            placeholder="e.g., Senior Product Manager at TechCo"
            value={formData.currentHeadline}
            onChange={(e) =>
              setFormData({ ...formData, currentHeadline: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">Max 220 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentAbout">Your Current About Section</Label>
          <Textarea
            id="currentAbout"
            placeholder="Paste your current About section, or leave blank if you don't have one..."
            rows={8}
            value={formData.currentAbout}
            onChange={(e) =>
              setFormData({ ...formData, currentAbout: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Current Role Description (Optional)</Label>
          <Textarea
            id="experience"
            placeholder="Describe what you do in your current role..."
            rows={4}
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Rewriting Your Profile...
            </>
          ) : (
            'Generate Profile Rewrite'
          )}
        </Button>

        {outputs && (
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-green-800">New LinkedIn Headline</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {outputs.rewrittenHeadline?.length || 0} / 220 characters
                </p>
                <p className="text-gray-800 text-lg">
                  {outputs.rewrittenHeadline}
                </p>
              </CardContent>
            </Card>

            <div>
              <h3 className="font-semibold mb-3">Improved About Section</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-xs font-medium text-gray-500 mb-2">BEFORE</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {formData.currentAbout || 'No previous About section'}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded">
                      <p className="text-xs font-medium text-purple-700 mb-2">AFTER</p>
                      <p className="text-gray-800 whitespace-pre-line">
                        {outputs.improvedAbout}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {outputs.betterRoleDescription && (
              <Card className="bg-indigo-50 border-indigo-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Enhanced Role Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {outputs.betterRoleDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            <Button onClick={handleNext} className="w-full" size="lg">
              Continue to Content
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </StepWrapper>
  )
}
