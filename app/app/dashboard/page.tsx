'use client'

import { useState } from 'react'
import { useSession } from '../../context/session-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Mail, CheckCircle2 } from 'lucide-react'
import { generatePacketPDF, downloadPDF } from '@/lib/pdf/generate'

export default function DashboardPage() {
  const { session } = useSession()
  const [emailSent, setEmailSent] = useState(false)
  const [reminderFrequency, setReminderFrequency] = useState<'light' | 'standard' | 'intensive'>('standard')

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

  const handleEmailPacket = async () => {
    if (!session.email) {
      alert('Email not found. Please restart the process.')
      return
    }

    try {
      // In a real implementation, this would upload the PDF and email it
      // For now, we'll just mark it as sent
      alert(`Packet will be emailed to: ${session.email}\n\n(Email functionality requires Resend API setup)`)
      setEmailSent(true)
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email. Please try again.')
    }
  }

  const handleSavePreferences = async () => {
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.userId,
          frequency: reminderFrequency,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })

      if (response.ok) {
        alert('Email preferences saved!')
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
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

        {/* Download & Email Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Get Your Packet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button onClick={handleDownloadPDF} size="lg" className="w-full">
                <Download className="mr-2 w-5 h-5" />
                Download PDF Packet
              </Button>
              <Button
                onClick={handleEmailPacket}
                size="lg"
                variant="outline"
                className="w-full"
                disabled={emailSent}
              >
                <Mail className="mr-2 w-5 h-5" />
                {emailSent ? 'Email Sent!' : 'Email Me The Packet'}
              </Button>
            </div>
            {session.email && (
              <p className="text-sm text-gray-600 text-center">
                Packet will be sent to: {session.email}
              </p>
            )}
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

        {/* Email Reminders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stay Accountable (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Get helpful reminders and tips to keep building your LinkedIn presence
            </p>

            <div className="space-y-3">
              <Label>Reminder frequency</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={reminderFrequency === 'light' ? 'default' : 'outline'}
                  onClick={() => setReminderFrequency('light')}
                >
                  Light
                </Button>
                <Button
                  variant={reminderFrequency === 'standard' ? 'default' : 'outline'}
                  onClick={() => setReminderFrequency('standard')}
                >
                  Standard
                </Button>
                <Button
                  variant={reminderFrequency === 'intensive' ? 'default' : 'outline'}
                  onClick={() => setReminderFrequency('intensive')}
                >
                  Intensive
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Light: Packet only | Standard: Weekly tips | Intensive: 2-3x per week
              </p>
            </div>

            <Button onClick={handleSavePreferences} className="w-full">
              Save Email Preferences
            </Button>
          </CardContent>
        </Card>

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
