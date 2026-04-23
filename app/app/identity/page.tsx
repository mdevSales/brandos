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
import { ArrowRight, Loader2, Lightbulb, Copy, Check } from 'lucide-react'

export default function IdentityPage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [formData, setFormData] = useState({
    name: session.name,
    role: '',
    industry: '',
    knownFor: '',
    whoTheyHelp: '',
    problemsSolved: '',
    differentiation: '',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<any>(null)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const aiHelperPrompt = `I need help defining my professional identity for LinkedIn. Can you help me answer these questions:

1. What should I be known for in my field? (I'm a ${formData.role || '[your role]'} in ${formData.industry || '[your industry]'})
2. Who do I help? (be specific about the audience)
3. What problems do I solve for them?
4. What makes my approach different from others?

Based on my background, suggest 2-3 positioning statements I could use.`

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiHelperPrompt)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleGenerate = async () => {
    if (!formData.role || !formData.industry) {
      alert('Please fill in at least role and industry')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: formData,
          voice: session.voice,
        }),
      })

      const data = await response.json()
      console.log('Identity outputs received:', data)
      setOutputs(data)

      // Save to session
      updateSession({
        identity: formData,
        identityOutputs: data,
      })
    } catch (error) {
      console.error('Error generating identity outputs:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (!outputs) {
      alert('Please generate your positioning first')
      return
    }

    updateSession({ currentStep: 3 })
    router.push('/app/authority')
  }

  return (
    <StepWrapper
      title="Your Identity"
      description="Let's clarify your positioning and unique value. This is the foundation of your LinkedIn brand."
    >
      <div className="space-y-6">
        {/* AI Helper Card */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Need help? Ask AI to brainstorm with you
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Use this prompt with ChatGPT, Claude, or Gemini to help clarify your positioning.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyPrompt}
                  className="bg-white"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy AI Prompt
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="role">Your Role</Label>
          <Input
            id="role"
            placeholder="e.g., Product Designer, Software Engineer, Marketing Director..."
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            💡 Examples: "Product Designer" • "Sales Engineer" • "Growth Marketing Lead"
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="e.g., SaaS, Healthcare, Fintech..."
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            💡 Examples: "B2B SaaS" • "E-commerce" • "EdTech" • "Healthcare Tech"
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="knownFor">What do you want to be known for?</Label>
          <Textarea
            id="knownFor"
            placeholder="e.g., Building intuitive products, Scaling teams, Creating content that simplifies complexity..."
            rows={3}
            value={formData.knownFor}
            onChange={(e) =>
              setFormData({ ...formData, knownFor: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            💡 Example: "Helping teams ship products faster without sacrificing quality"
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whoTheyHelp">Who do you help?</Label>
          <Input
            id="whoTheyHelp"
            placeholder="e.g., Early-stage startups, Mid-market companies, Teams scaling from 10 to 100..."
            value={formData.whoTheyHelp}
            onChange={(e) =>
              setFormData({ ...formData, whoTheyHelp: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            💡 Examples: "Series A startups" • "Mid-market SaaS companies" • "First-time managers"
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="problemsSolved">
            What problems do you solve?
          </Label>
          <Textarea
            id="problemsSolved"
            placeholder="e.g., Poor user retention, Inefficient workflows, Unclear positioning..."
            rows={3}
            value={formData.problemsSolved}
            onChange={(e) =>
              setFormData({ ...formData, problemsSolved: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            💡 Example: "Fixing broken onboarding flows that cause 70% of users to drop off"
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="differentiation">
            What makes you different?
          </Label>
          <Textarea
            id="differentiation"
            placeholder="e.g., 10 years in both design and engineering, Built 3 products from 0 to 1M users, Worked across 5 industries..."
            rows={3}
            value={formData.differentiation}
            onChange={(e) =>
              setFormData({ ...formData, differentiation: e.target.value })
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
              Generating Your Positioning...
            </>
          ) : (
            'Generate Positioning'
          )}
        </Button>

        {outputs && (
          <div className="space-y-6">
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Your Value Statement</h3>
                <p className="text-lg text-gray-800">
                  {outputs.helpStatement}
                </p>
              </CardContent>
            </Card>

            <div>
              <h3 className="font-semibold mb-3">
                Positioning Statement Options
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose the one that feels most authentic to you
              </p>
              <div className="space-y-3">
                {outputs.positioningStatements && outputs.positioningStatements.map(
                  (statement: string, idx: number) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium">
                            {idx + 1}
                          </span>
                          <p className="text-gray-700">{statement}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">LinkedIn Headline Options</h3>
              <div className="space-y-3">
                {outputs.headlines && outputs.headlines.map((headline: string, idx: number) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700">{headline}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              Continue to Authority
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </StepWrapper>
  )
}
