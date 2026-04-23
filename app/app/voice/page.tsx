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
import { ArrowRight, Loader2 } from 'lucide-react'

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
      title="Voice Calibration"
      description="Help us understand your natural writing style so we can generate content that sounds like you, not generic AI."
    >
      <div className="space-y-6">
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
            This helps us match your natural voice and rhythm.
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="fakeTone">What writing feels fake to you?</Label>
            <Input
              id="fakeTone"
              placeholder="e.g., overly motivational, corporate jargon..."
              value={fakeTone}
              onChange={(e) => setFakeTone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bannedWords">Words you hate (comma-separated)</Label>
            <Input
              id="bannedWords"
              placeholder="e.g., synergy, leverage, disruptive..."
              value={bannedWords}
              onChange={(e) => setBannedWords(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toneToAvoid">What tone do you want to avoid?</Label>
            <Input
              id="toneToAvoid"
              placeholder="e.g., humble-bragging, preachy..."
              value={toneToAvoid}
              onChange={(e) => setToneToAvoid(e.target.value)}
            />
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
