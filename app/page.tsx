import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Sparkles, Target, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Privacy-first LinkedIn brand building
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
            BrandOS
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
            Build your LinkedIn brand in one guided session
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Go from blank profile to confident presence. Get your positioning, rewritten profile, content ideas, and 30-day plan — all in 60 minutes.
          </p>

          <Link href="/start">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Start Building Your Brand
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            No signup required to start • Takes 45-60 minutes • Download your packet
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Guided Experience</h3>
            <p className="text-gray-600">
              Step-by-step process that helps you clarify your positioning, authority, and unique perspective. No guesswork.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Voice Calibration</h3>
            <p className="text-gray-600">
              Your content sounds like you, not generic AI. We match your natural tone and avoid phrases that feel fake.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Complete Packet</h3>
            <p className="text-gray-600">
              Download everything: positioning, rewritten profile, content pillars, 10 post ideas, 3 ready-to-use posts, and your 30-day plan.
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What you'll walk away with
          </h2>

          <div className="space-y-4">
            {[
              'Your unique positioning and value statement',
              'Rewritten LinkedIn headline under 220 characters',
              'Improved About section that tells your story',
              '3 content pillars aligned with your expertise',
              '10 specific post ideas based on your perspective',
              '3 ready-to-publish posts in your voice',
              '30-day action plan with posting cadence',
              'Engagement strategy to build momentum',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto bg-purple-50 border border-purple-100 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-3">Privacy-first approach</h3>
          <p className="text-gray-700 mb-4">
            We don't store your detailed inputs, writing samples, or generated content. After you download your packet, everything is deleted.
          </p>
          <p className="text-gray-600 text-sm">
            We only save: your name, email, completion status, and email preferences (if you opt in). That's it.
          </p>
        </div>

        <div className="mt-20 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Used in live workshops by <strong>Southasiaforce</strong>
          </p>
          <Link href="/start">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <footer className="border-t border-gray-200 py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>BrandOS by Southasiaforce</p>
          <p className="mt-2">Building brands, one session at a time.</p>
        </div>
      </footer>
    </div>
  )
}
