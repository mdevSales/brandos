'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../../context/session-context'
import { StepWrapper } from '@/components/step-wrapper'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function PerspectivePage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [formData, setFormData] = useState({
    beliefs: '',
    disagreements: '',
    overrated: '',
    underrated: '',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<any>(null)

  const handleGenerate = async () => {
    if (!formData.beliefs && !formData.disagreements) {
      alert('Please fill in at least your beliefs or disagreements')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/perspective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: formData,
          voice: session.voice,
        }),
      })

      const data = await response.json()
      console.log('Perspective outputs received:', data)
      setOutputs(data)

      updateSession({
        perspective: formData,
        perspectiveOutputs: data,
      })
    } catch (error) {
      console.error('Error generating perspective outputs:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (!outputs) {
      alert('Please generate your content strategy first')
      return
    }

    updateSession({ currentStep: 5 })
    router.push('/app/profile')
  }

  return (
    <StepWrapper
      title={`Almost there ${session.name}! What's your unique perspective?`}
      description="Fill out the below - your unique viewpoint is what makes your content worth reading."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="beliefs">What do you believe about your industry or work?</Label>
          <Textarea
            id="beliefs"
            placeholder="e.g., I believe most companies over-invest in features and under-invest in user experience..."
            rows={4}
            value={formData.beliefs}
            onChange={(e) =>
              setFormData({ ...formData, beliefs: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="disagreements">What do you disagree with that most people accept?</Label>
          <Textarea
            id="disagreements"
            placeholder="e.g., I disagree that growth always requires more headcount. Most scaling problems are process problems..."
            rows={4}
            value={formData.disagreements}
            onChange={(e) =>
              setFormData({ ...formData, disagreements: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overrated">What's overrated in your field?</Label>
          <Textarea
            id="overrated"
            placeholder="e.g., Hustle culture, 10x engineers, always saying yes..."
            rows={3}
            value={formData.overrated}
            onChange={(e) =>
              setFormData({ ...formData, overrated: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="underrated">What's underrated?</Label>
          <Textarea
            id="underrated"
            placeholder="e.g., Clear documentation, saying no, taking breaks..."
            rows={3}
            value={formData.underrated}
            onChange={(e) =>
              setFormData({ ...formData, underrated: e.target.value })
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
              Generating Your Content Strategy...
            </>
          ) : (
            'Generate Content Strategy'
          )}
        </Button>

        {outputs && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Your Content Pillars</h3>
              <p className="text-sm text-gray-600 mb-4">
                These are the main themes you should post about
              </p>
              <div className="space-y-3">
                {outputs.contentPillars && outputs.contentPillars.map((pillar: string, idx: number) => (
                  <Card key={idx} className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <p className="text-gray-800 font-medium pt-1">{pillar}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Post Angles</h3>
              <p className="text-sm text-gray-600 mb-4">
                Specific story ideas you can write about
              </p>
              <div className="space-y-2">
                {outputs.postAngles && outputs.postAngles.map((angle: string, idx: number) => (
                  <Card key={idx}>
                    <CardContent className="pt-3 pb-3">
                      <div className="flex gap-3">
                        <span className="text-purple-600 font-medium">•</span>
                        <p className="text-gray-700">{angle}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              Continue to Profile
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </StepWrapper>
  )
}
