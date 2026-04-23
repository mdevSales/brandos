'use client'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  { number: 1, name: 'Voice' },
  { number: 2, name: 'Identity' },
  { number: 3, name: 'Authority' },
  { number: 4, name: 'Perspective' },
  { number: 5, name: 'Profile' },
  { number: 6, name: 'Content' },
  { number: 7, name: 'Plan' },
  { number: 8, name: 'Done' },
]

export function ProgressIndicator({ currentStep, totalSteps = 8 }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={`Step ${currentStep} of ${totalSteps}`}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center text-xs">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`flex flex-col items-center transition-all duration-200 ${
              step.number === currentStep
                ? 'text-purple-600 font-semibold scale-110'
                : step.number < currentStep
                ? 'text-gray-600'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 transition-all duration-200 ${
                step.number === currentStep
                  ? 'bg-purple-600 text-white ring-4 ring-purple-100'
                  : step.number < currentStep
                  ? 'bg-gray-400 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number < currentStep ? '✓' : step.number}
            </div>
            <span className="hidden sm:block">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
