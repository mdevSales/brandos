'use client'

import { useSession } from '../../context/session-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle2 } from 'lucide-react'
import { generatePacketPDF, downloadPDF } from '@/lib/pdf/generate'

export default function DashboardPage() {
  const { session } = useSession()

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


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">🎉 You're All Set, {session.name}!</h1>
          <p className="text-xl text-gray-600">
            Your complete LinkedIn brand packet is ready
          </p>
        </div>

        {/* Download Action */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Get Your Packet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleDownloadPDF} size="lg" className="w-full">
              <Download className="mr-2 w-5 h-5" />
              Download PDF Packet
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Your complete LinkedIn brand guide as a PDF
            </p>
          </CardContent>
        </Card>

        {/* Summary Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Positioning */}
          {session.identityOutputs && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Positioning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">
                  {session.identityOutputs.helpStatement}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Headline */}
          {session.profileOutputs && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">New LinkedIn Headline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {session.profileOutputs.rewrittenHeadline}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Content Pillars */}
          {session.perspectiveOutputs && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Pillars</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {session.perspectiveOutputs.contentPillars?.map((pillar: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span className="text-gray-700">{pillar}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Post Ideas Count */}
          {session.contentOutputs && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ready-to-Use Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <p>✓ {session.contentOutputs.postIdeas?.length || 0} post ideas</p>
                  <p>✓ {session.contentOutputs.fullPosts?.length || 0} complete posts</p>
                  <p>✓ {session.contentOutputs.hooks?.length || 0} attention-grabbing hooks</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Next Steps */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle>🚀 Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">1.</span>
                <span>Update your LinkedIn profile with your new headline and About section</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">2.</span>
                <span>Schedule your first 3 posts using the content we generated</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">3.</span>
                <span>Spend 10 minutes engaging with others' posts before you publish yours</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">4.</span>
                <span>Follow your 30-day plan to build consistent momentum</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">5.</span>
                <span>Track what resonates and adjust your approach</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">Built with BrandOS by Southasiaforce</p>
          <p className="text-sm text-gray-500">Building brands, one session at a time.</p>
        </div>
      </div>
    </div>
  )
}
