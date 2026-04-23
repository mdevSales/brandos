'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../../context/session-context'
import { StepWrapper } from '@/components/step-wrapper'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Loader2, Lightbulb, Copy, Check } from 'lucide-react'

export default function VoiceCalibrationPage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [writingSample, setWritingSample] = useState('')
  const [naturalSound, setNaturalSound] = useState('')
  const [fakeTone, setFakeTone] = useState('')
  const [bannedWords, setBannedWords] = useState('')
  const [toneToAvoid, setToneToAvoid] = useState('')
  const [preferredLength, setPreferredLength] = useState<'concise' | 'storytelling'>('concise')

  const [sliders, setSliders] = useState({
    conciseExpressive: 50,
    warmAuthoritative: 50,
    reflectiveTactical: 50,
    casualPolished: 50,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [voiceProfile, setVoiceProfile] = useState<any>(null)
  const [showAIPrompt, setShowAIPrompt] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const aiPrompt = `Help me understand my writing voice for LinkedIn. Analyze this and tell me:
1. How do I naturally sound? (tone, style)
2. What makes my writing feel authentic vs. fake?
3. What words or phrases should I avoid?
4. Am I more concise or storytelling?

Here's my writing sample:
${writingSample || '[Paste your writing sample here]'}`

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPrompt)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          writingSample,
          preferences: {
            naturalSound,
            fakeTone,
            bannedWords: bannedWords.split(',').map(w => w.trim()),
            toneToAvoid,
            preferredLength,
          },
          sliders,
        }),
      })

      const data = await response.json()

      setVoiceProfile(data)

      // Save to session
      updateSession({
        voice: {
          writingSample,
          tonePreferences: {
            naturalSound,
            fakeTone,
            bannedWords: bannedWords.split(',').map(w => w.trim()),
            toneToAvoid,
            preferredLength,
          },
          sliders,
          summary: data.summary,
          bannedPhrases: data.bannedPhrases,
        },
      })
    } catch (error) {
      console.error('Error generating voice profile:', error)
      alert('Failed to generate voice profile. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (!voiceProfile) {
      alert('Please generate your voice profile first')
      return
    }

    updateSession({ currentStep: 2 })
    router.push('/app/identity')
  }

  return (
    <StepWrapper
      title={`Hi ${session.name}! Let's calibrate your voice`}
      description="Help us understand your natural writing style so we can generate content that sounds like you, not generic AI."
      showBack={false}
    >
      <div className="space-y-6">
        {/* AI Helper Card */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Not sure how to describe your voice? Ask AI!
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Copy this prompt and paste it into ChatGPT, Claude, or Gemini along with a writing sample.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIPrompt(!showAIPrompt)}
                  className="bg-white"
                >
                  {showAIPrompt ? 'Hide' : 'Show'} AI Prompt
                </Button>
                {showAIPrompt && (
                  <div className="mt-3 p-3 bg-white rounded border border-indigo-200 text-sm">
                    <pre className="whitespace-pre-wrap font-mono text-xs text-gray-700 mb-3">
                      {aiPrompt}
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyPrompt}
                      className="w-full"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Writing Sample */}
        <div className="space-y-2">
          <Label htmlFor="writingSample">
            Writing Sample (Optional but Recommended)
          </Label>
          <Textarea
            id="writingSample"
            placeholder="Paste a paragraph or two of your natural writing. Could be from an email, blog post, or previous LinkedIn post..."
            rows={6}
            value={writingSample}
            onChange={(e) => setWritingSample(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            💡 Example: "Hey team, wanted to share a quick win from this week. We finally shipped the feature I've been working on for the past month. The response has been incredible - 200+ users activated it in the first 24 hours..."
          </p>
        </div>

        {/* Tone Questions */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="naturalSound">How do you naturally sound?</Label>
            <Input
              id="naturalSound"
              placeholder="e.g., direct, conversational, thoughtful..."
              value={naturalSound}
              onChange={(e) => setNaturalSound(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              💡 Examples: "Direct and to the point" • "Warm and conversational" • "Data-driven but accessible"
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fakeTone">What writing feels fake to you?</Label>
            <Input
              id="fakeTone"
              placeholder="e.g., overly motivational, corporate jargon..."
              value={fakeTone}
              onChange={(e) => setFakeTone(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              💡 Examples: "Generic motivational speak" • "Corporate buzzword soup" • "Forced enthusiasm"
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bannedWords">Words you hate (comma-separated)</Label>
            <Input
              id="bannedWords"
              placeholder="e.g., synergy, leverage, disruptive..."
              value={bannedWords}
              onChange={(e) => setBannedWords(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              💡 Examples: synergy, leverage, disruptive, rockstar, ninja, guru, hustle
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toneToAvoid">What tone do you want to avoid?</Label>
            <Input
              id="toneToAvoid"
              placeholder="e.g., humble-bragging, preachy..."
              value={toneToAvoid}
              onChange={(e) => setToneToAvoid(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              💡 Examples: "Humble-bragging" • "Overly salesy" • "Preachy or self-important"
            </p>
          </div>

          <div className="space-y-2">
            <Label>Preferred length</Label>
            <div className="flex gap-4">
              <Button
                variant={preferredLength === 'concise' ? 'default' : 'outline'}
                onClick={() => setPreferredLength('concise')}
              >
                Concise & Direct
              </Button>
              <Button
                variant={preferredLength === 'storytelling' ? 'default' : 'outline'}
                onClick={() => setPreferredLength('storytelling')}
              >
                Storytelling
              </Button>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6 pt-4">
          <h3 className="font-semibold">Fine-tune your tone</h3>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Concise</span>
              <span className="font-medium">{sliders.conciseExpressive}</span>
              <span>Expressive</span>
            </div>
            <Slider
              value={[sliders.conciseExpressive]}
              onValueChange={(value) =>
                setSliders({ ...sliders, conciseExpressive: value[0] })
              }
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Warm</span>
              <span className="font-medium">{sliders.warmAuthoritative}</span>
              <span>Authoritative</span>
            </div>
            <Slider
              value={[sliders.warmAuthoritative]}
              onValueChange={(value) =>
                setSliders({ ...sliders, warmAuthoritative: value[0] })
              }
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Reflective</span>
              <span className="font-medium">{sliders.reflectiveTactical}</span>
              <span>Tactical</span>
            </div>
            <Slider
              value={[sliders.reflectiveTactical]}
              onValueChange={(value) =>
                setSliders({ ...sliders, reflectiveTactical: value[0] })
              }
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Casual</span>
              <span className="font-medium">{sliders.casualPolished}</span>
              <span>Polished</span>
            </div>
            <Slider
              value={[sliders.casualPolished]}
              onValueChange={(value) =>
                setSliders({ ...sliders, casualPolished: value[0] })
              }
              max={100}
              step={1}
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Generating Your Voice Profile...
            </>
          ) : (
            'Generate Voice Profile'
          )}
        </Button>

        {/* Voice Profile Output */}
        {voiceProfile && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Your Voice DNA</h3>
              <p className="text-gray-700 mb-4">{voiceProfile.summary}</p>

              {voiceProfile.bannedPhrases && voiceProfile.bannedPhrases.length > 0 && (
                <>
                  <h4 className="font-medium text-sm mb-2">
                    Phrases we'll avoid:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {voiceProfile.bannedPhrases.map((phrase: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs bg-white px-2 py-1 rounded border border-purple-200"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Next Button */}
        {voiceProfile && (
          <Button onClick={handleNext} className="w-full" size="lg">
            Continue to Identity
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}

        {/* Skip Option */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              updateSession({ currentStep: 2 })
              router.push('/app/identity')
            }}
          >
            Skip voice calibration (not recommended)
          </Button>
        </div>
      </div>
    </StepWrapper>
  )
}
