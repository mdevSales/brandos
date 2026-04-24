'use client'

import { useSession } from '../../context/session-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle2, Copy, Sparkles, TrendingUp, Users, FileText, Calendar, Lightbulb } from 'lucide-react'
import { generatePacketPDF, downloadPDF } from '@/lib/pdf/generate'
import { useState } from 'react'

export default function DashboardPage() {
  const { session } = useSession()
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const handleDownloadPDF = () => {
    try {
      const blob = generatePacketPDF(session)
      downloadPDF(blob, `${session.name.replace(/\s+/g, '-')}-BrandOS-Packet.pdf`)
      alert('PDF downloaded successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            🎉 You're Ready, {session.name}!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-3 max-w-3xl mx-auto">
            Your complete LinkedIn brand transformation is ready
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to build a compelling LinkedIn presence and stand out in your industry
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Download Your Packet</h3>
                  <p className="text-sm text-gray-600">Complete brand guide as PDF</p>
                </div>
              </div>
              <Button onClick={handleDownloadPDF} size="lg" className="w-full">
                <Download className="mr-2 w-5 h-5" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Use with AI Tools</h3>
                  <p className="text-sm text-gray-600">Extend with Gemini, ChatGPT, Claude</p>
                </div>
              </div>
              <Button variant="outline" size="lg" className="w-full" onClick={() => {
                const aiPrompt = `I'm building my LinkedIn presence. Here's my brand positioning:\n\n${session.identityOutputs?.helpStatement}\n\nContent pillars: ${session.perspectiveOutputs?.contentPillars?.join(', ')}\n\nHelp me create more content that matches this voice and positioning.`
                handleCopy(aiPrompt, 'ai-prompt')
              }}>
                <Copy className="mr-2 w-5 h-5" />
                {copiedSection === 'ai-prompt' ? 'Copied!' : 'Copy AI Prompt'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* LinkedIn Profile Preview */}
        {session.profileOutputs && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-3">Your New LinkedIn Profile</h2>
              <p className="text-gray-600">This is what your profile will look like</p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-xl border-2 border-gray-200">
              <CardContent className="p-8">
                {/* Mock LinkedIn Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 rounded-t-lg -m-8 mb-4"></div>

                {/* Profile Photo Placeholder */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full border-4 border-white -mt-16 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {session.name.charAt(0)}
                  </div>
                  <div className="flex-1 mt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{session.name}</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-lg text-gray-800 font-medium">{session.profileOutputs?.rewrittenHeadline}</p>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-900">About</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(session.profileOutputs?.improvedAbout || '', 'about')}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedSection === 'about' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {session.profileOutputs?.improvedAbout}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Your Brand Foundation */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold mb-3">Your Brand Foundation</h2>
            <p className="text-gray-600">The core elements that make you unique</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Positioning */}
            {session.identityOutputs && (
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Your Positioning</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded mb-4">
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {session.identityOutputs?.helpStatement}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleCopy(session.identityOutputs?.helpStatement || '', 'positioning')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedSection === 'positioning' ? 'Copied!' : 'Copy Positioning'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Content Pillars */}
            {session.perspectiveOutputs && (
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Content Pillars</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-4">
                    {session.perspectiveOutputs.contentPillars?.map((pillar: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                        <span className="text-indigo-600 font-bold text-lg mt-0.5">{idx + 1}</span>
                        <span className="text-gray-800 flex-1">{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Authority */}
            {session.authorityOutputs && (
              <Card className="shadow-lg hover:shadow-xl transition-shadow md:col-span-2">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Your Credibility & Proof Points</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {session.authorityOutputs.proofPoints?.map((proof: string, idx: number) => (
                      <div key={idx} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-gray-800 text-sm">{proof}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Ready-to-Use Content */}
        {session.contentOutputs && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-3">Your Content Library</h2>
              <p className="text-gray-600">Ready-to-publish posts and ideas</p>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
              {/* Full Posts */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">3 Ready-to-Publish Posts</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {session.contentOutputs.fullPosts?.map((post: string, idx: number) => (
                      <div key={idx} className="border-2 border-orange-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Post {idx + 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(post, `post-${idx}`)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {copiedSection === `post-${idx}` ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{post}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Post Ideas */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">10 Post Ideas to Expand On</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {session.contentOutputs.postIdeas?.map((idea: string, idx: number) => (
                      <div key={idx} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start gap-3">
                          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-gray-800 text-sm flex-1">{idea}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hooks */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">5 Attention-Grabbing Hooks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {session.contentOutputs.hooks?.map((hook: string, idx: number) => (
                      <div key={idx} className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500 flex items-center justify-between">
                        <p className="text-gray-800 font-medium">{hook}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(hook, `hook-${idx}`)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 30-Day Action Plan */}
        {session.plan && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-3">Your 30-Day Action Plan</h2>
              <p className="text-gray-600">Follow this roadmap to build momentum</p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8" />
                  <CardTitle className="text-2xl">Week-by-Week Breakdown</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {session.plan.weeklyPlan?.map((week: string, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-800 leading-relaxed">{week}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-indigo-900">Posting Cadence</h4>
                    <p className="text-gray-700">{session.plan.postingCadence}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-purple-900">Engagement Strategy</h4>
                    <p className="text-gray-700">{session.plan.engagementStrategy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* How to Use with AI Tools */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto shadow-xl border-2 border-indigo-200">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                <CardTitle className="text-2xl">Extend This with AI Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-6 text-lg">
                Use your PDF with Gemini, ChatGPT, or Claude to generate even more content that matches your brand voice.
              </p>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                    Download your PDF packet
                  </h4>
                  <p className="text-gray-700 ml-8">Contains all your positioning, content, and brand voice details</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                    Upload to your AI tool of choice
                  </h4>
                  <p className="text-gray-700 ml-8">Gemini, ChatGPT Plus, or Claude can read PDFs and understand your brand</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border-l-4 border-pink-500">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                    Ask it to create more content
                  </h4>
                  <p className="text-gray-700 ml-8 mb-3">Try prompts like:</p>
                  <ul className="ml-8 space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>"Create 5 more post ideas based on my content pillars"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>"Write a post about [topic] in my voice"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>"Help me respond to a comment on my post"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>"Generate 10 headlines variations for [topic]"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
              Next Steps to Launch Your Brand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {[
                { num: 1, text: "Update your LinkedIn profile with your new headline and About section", icon: Users },
                { num: 2, text: "Download the PDF and keep it as your brand reference guide", icon: Download },
                { num: 3, text: "Schedule your first 3 posts (spread them over the next week)", icon: Calendar },
                { num: 4, text: "Spend 10-15 minutes daily engaging with others' posts before posting yours", icon: TrendingUp },
                { num: 5, text: "Use the PDF with Gemini/ChatGPT to generate more content as you go", icon: Sparkles },
                { num: 6, text: "Follow the 30-day plan and track what resonates with your audience", icon: Calendar }
              ].map((step) => (
                <li key={step.num} className="flex gap-4 items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{step.text}</p>
                  </div>
                  <step.icon className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-gray-600 mb-2 text-lg">Built with BrandOS by Southasiaforce DMV</p>
          <p className="text-gray-500">Your LinkedIn transformation starts now. 🚀</p>
        </div>
      </div>
    </div>
  )
}
