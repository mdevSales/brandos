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

export default function AuthorityPage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [formData, setFormData] = useState({
    wins: ['', '', ''],
    challenges: ['', ''],
    strengths: '',
    keyProject: '',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<any>(null)

  const handleGenerate = async () => {
    if (!formData.wins[0] || !formData.strengths) {
      alert('Please fill in at least one win and your strengths')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/authority', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: formData,
          voice: session.voice,
        }),
      })

      const data = await response.json()
      console.log('Authority outputs received:', data)
      setOutputs(data)

      updateSession({
        authority: formData,
        authorityOutputs: data,
      })
    } catch (error) {
      console.error('Error generating authority outputs:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (!outputs) {
      alert('Please generate your authority inventory first')
      return
    }

    updateSession({ currentStep: 4 })
    router.push('/app/perspective')
  }

  return (
    <StepWrapper
      title="Your Authority"
      description="Let's highlight your expertise, wins, and credibility. This builds trust and positions you as someone worth listening to."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Your 3 Biggest Wins</Label>
          {formData.wins.map((win, idx) => (
            <div key={idx} className="space-y-2">
              <Input
                placeholder={`Win ${idx + 1}: e.g., Led team to increase revenue by 40%, Launched product used by 10k+ users...`}
                value={win}
                onChange={(e) => {
                  const newWins = [...formData.wins]
                  newWins[idx] = e.target.value
                  setFormData({ ...formData, wins: newWins })
                }}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Label>2 Challenges You've Overcome</Label>
          {formData.challenges.map((challenge, idx) => (
            <div key={idx} className="space-y-2">
              <Input
                placeholder={`Challenge ${idx + 1}: e.g., Scaled team from 5 to 50, Pivoted failing product...`}
                value={challenge}
                onChange={(e) => {
                  const newChallenges = [...formData.challenges]
                  newChallenges[idx] = e.target.value
                  setFormData({ ...formData, challenges: newChallenges })
                }}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="strengths">Your Core Strengths</Label>
          <Textarea
            id="strengths"
            placeholder="e.g., Strategic thinking, building relationships, simplifying complexity, data analysis..."
            rows={3}
            value={formData.strengths}
            onChange={(e) =>
              setFormData({ ...formData, strengths: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyProject">One Key Project That Showcases Your Work</Label>
          <Textarea
            id="keyProject"
            placeholder="Describe a project you're proud of and what it achieved..."
            rows={4}
            value={formData.keyProject}
            onChange={(e) =>
              setFormData({ ...formData, keyProject: e.target.value })
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
              Generating Your Authority Inventory...
            </>
          ) : (
            'Generate Authority Inventory'
          )}
        </Button>

        {outputs && (
          <div className="space-y-6">
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Authority Summary</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {outputs.inventory}
                </p>
              </CardContent>
            </Card>

            <div>
              <h3 className="font-semibold mb-3">Your Proof Points</h3>
              <div className="space-y-2">
                {outputs.proofPoints && outputs.proofPoints.map((point: string, idx: number) => (
                  <Card key={idx}>
                    <CardContent className="pt-4 pb-4">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700">{point}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Credibility Statement</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {outputs.credibilityParagraph}
                </p>
              </CardContent>
            </Card>

            <Button onClick={handleNext} className="w-full" size="lg">
              Continue to Perspective
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </StepWrapper>
  )
}
