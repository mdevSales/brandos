'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../../context/session-context'
import { StepWrapper } from '@/components/step-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Loader2, Copy } from 'lucide-react'

export default function ContentPage() {
  const router = useRouter()
  const { session, updateSession } = useSession()

  const [topics, setTopics] = useState('')
  const [postTypes, setPostTypes] = useState<string[]>([])

  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<any>(null)

  const postTypeOptions = ['Story', 'How-to', 'Opinion', 'Lesson learned', 'Behind the scenes', 'Advice']

  const togglePostType = (type: string) => {
    if (postTypes.includes(type)) {
      setPostTypes(postTypes.filter(t => t !== type))
    } else {
      setPostTypes([...postTypes, type])
    }
  }

  const handleGenerate = async () => {
    if (!topics) {
      alert('Please enter at least one topic')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            topics: topics.split(',').map(t => t.trim()),
            postTypes: postTypes.length > 0 ? postTypes : postTypeOptions,
          },
          voice: session.voice,
        }),
      })

      const data = await response.json()
      setOutputs(data)

      updateSession({
        content: { topics: topics.split(','), postTypes },
        contentOutputs: data,
      })
    } catch (error) {
      console.error('Error generating content outputs:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (!outputs) {
      alert('Please generate your content first')
      return
    }

    updateSession({ currentStep: 7 })
    router.push('/app/plan')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <StepWrapper
      title={`${session.name}, this is the last step I promise!`}
      description="Fill out the below so we can generate specific post ideas and ready-to-use content in your voice."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topics">Topics you want to post about (comma-separated)</Label>
          <Input
            id="topics"
            placeholder="e.g., leadership, product strategy, career growth, AI"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Post types you prefer</Label>
          <div className="flex flex-wrap gap-2">
            {postTypeOptions.map(type => (
              <Button
                key={type}
                variant={postTypes.includes(type) ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePostType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500">Leave empty to use all types</p>
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
              Generating Your Content...
            </>
          ) : (
            'Generate Content Ideas & Posts'
          )}
        </Button>

        {outputs && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">10 Post Ideas</h3>
              <div className="space-y-2">
                {outputs.postIdeas && outputs.postIdeas.map((idea: string, idx: number) => (
                  <Card key={idx}>
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-medium">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700 flex-1">{idea}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Attention-Grabbing Hooks</h3>
              <div className="space-y-2">
                {outputs.hooks && outputs.hooks.map((hook: string, idx: number) => (
                  <Card key={idx} className="bg-amber-50 border-amber-200">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-center gap-3">
                        <p className="text-gray-800 flex-1">{hook}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(hook)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">3 Ready-to-Use Posts</h3>
              <div className="space-y-4">
                {outputs.fullPosts && outputs.fullPosts.map((post: string, idx: number) => (
                  <Card key={idx} className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-green-800">Post {idx + 1}</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(post)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <p className="text-gray-800 whitespace-pre-line">
                        {post}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              Continue to 30-Day Plan
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </StepWrapper>
  )
}
