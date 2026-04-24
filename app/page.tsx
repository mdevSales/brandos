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
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Southasiaforce DMV</span>
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

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why LinkedIn branding matters at work</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <p className="text-4xl font-bold text-orange-600 mb-2">87%</p>
              <p className="text-gray-700">of recruiters use LinkedIn when they&apos;re checking you out</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg">
              <p className="text-4xl font-bold text-green-600 mb-2">4 out of 5</p>
              <p className="text-gray-700">of LinkedIn users make decisions that matter at work — if they can&apos;t find you, you&apos;re invisible</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-4xl font-bold text-blue-600 mb-2">40 million</p>
              <p className="text-gray-700">people look for new opportunities on LinkedIn every week — and they&apos;re probably checking your profile right now</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <p className="text-4xl font-bold text-purple-600 mb-2">75%</p>
              <p className="text-gray-700">of people who switched jobs found them on LinkedIn — most started looking before they needed to</p>
            </div>
          </div>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 text-center">
            <p className="text-lg text-gray-800 leading-relaxed">
              <strong>The reality:</strong> People at work are looking you up on LinkedIn. Your boss, your teammates, recruiters at companies you haven&apos;t even heard of yet. If your profile is blank or generic, you&apos;re leaving opportunities on the table.
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto bg-purple-50 border border-purple-100 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-3">Privacy-first approach</h3>
          <p className="text-gray-700 mb-4">
            We don't store your detailed inputs, writing samples, or generated content. After you download your packet, everything is deleted.
          </p>
          <p className="text-gray-600 text-sm">
            We only save: your name, completion status. That's it.
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
