import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Sparkles, Target, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            None of your data is saved anywhere — fully private
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
            LinkedIn Brand Building Workshop Guide
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-200 mb-8">
            <span className="text-sm text-gray-600">Powered by</span>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">BrandOS ✨</span>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            This isn't another generic branding tool. It's a guided experience that helps you uncover what makes you different, craft messaging that sounds like you, and leave with everything you need to show up confidently on LinkedIn.
          </p>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            In one focused session, you'll go from overwhelmed (or invisible) to clear, positioned, and ready to build momentum. No fluff. Just the framework, the content, and the plan.
          </p>

          <Link href="/start">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Start Building My Brand
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            Takes 45-60 minutes • Download your complete packet • Nothing stored after
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Guided, Not Generic</h3>
            <p className="text-gray-600">
              A step-by-step process that helps you clarify your positioning, authority, and unique perspective. No guesswork, no templates.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sounds Like You</h3>
            <p className="text-gray-600">
              Voice calibration ensures your content matches your natural tone. No cringe-worthy AI phrases that make people scroll past.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Everything You Need</h3>
            <p className="text-gray-600">
              Walk away with your positioning, rewritten profile, content pillars, 10 post ideas, 3 ready-to-publish posts, and a 30-day plan.
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
          <Link href="/start">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              Start Building My Brand
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
