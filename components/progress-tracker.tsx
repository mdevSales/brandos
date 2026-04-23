'use client'

import { Progress } from '@/components/ui/progress'

interface ProgressTrackerProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  'Voice',
  'Identity',
  'Authority',
  'Perspective',
  'Profile',
  'Content',
  'Plan',
  'Dashboard',
]

export function ProgressTracker({
  currentStep,
  totalSteps,
}: ProgressTrackerProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progress)}%
        </span>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="flex justify-between mt-4">
        {steps.map((step, idx) => {
          const stepNum = idx + 1
          const isActive = stepNum === currentStep
          const isComplete = stepNum < currentStep

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isComplete
                    ? 'bg-purple-600 text-white'
                    : isActive
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-600'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isComplete ? '✓' : stepNum}
              </div>
              <span
                className={`text-xs mt-1 ${
                  isActive ? 'text-purple-700 font-medium' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
