'use client'

import { SessionProvider } from '../context/session-context'
import { ProgressTracker } from '@/components/progress-tracker'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Map paths to step numbers
  const stepMap: Record<string, number> = {
    '/app/voice': 1,
    '/app/identity': 2,
    '/app/authority': 3,
    '/app/perspective': 4,
    '/app/profile': 5,
    '/app/content': 6,
    '/app/plan': 7,
    '/app/dashboard': 8,
  }

  const currentStep = stepMap[pathname] || 1
  const totalSteps = 8

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <ProgressTracker currentStep={currentStep} totalSteps={totalSteps} />
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </SessionProvider>
  )
}
