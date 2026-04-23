'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../../context/session-context'
import { StepWrapper } from '@/components/step-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function PlanPage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [isGenerating, setIsGenerating] = useState(true)
  const [outputs, setOutputs] = useState<any>(null)

  useEffect(() => {
    generatePlan()
  }, [])

  const generatePlan = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voice: session.voice,
        }),
      })

      const data = await response.json()
      setOutputs(data)

      updateSession({
        plan: data,
      })
    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    updateSession({ currentStep: 8 })
    router.push('/app/dashboard')
  }

  return (
    <StepWrapper
      title="Your 30-Day Action Plan"
      description="A realistic, step-by-step plan to build momentum on LinkedIn."
    >
      <div className="space-y-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
            <p className="text-gray-600">Generating your personalized 30-day plan...</p>
          </div>
        ) : outputs ? (
          <>
            <div>
              <h3 className="font-semibold mb-3">Weekly Breakdown</h3>
              <div className="space-y-3">
                {outputs.weeklyPlan && outputs.weeklyPlan.map((week: string, idx: number) => (
                  <Card key={idx} className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                          W{idx + 1}
                        </span>
                        <p className="text-gray-800 pt-2 whitespace-pre-line">{week}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Posting Cadence</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {outputs.postingCadence}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Engagement Strategy</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {outputs.engagementStrategy}
                </p>
              </CardContent>
            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
              <p className="text-gray-700">
                Consistency beats perfection. It's better to post 2x per week for 3 months than daily for 2 weeks then disappear.
              </p>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              View Your Complete Brand Packet
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </>
        ) : null}
      </div>
    </StepWrapper>
  )
}
