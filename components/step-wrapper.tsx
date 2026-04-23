'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { ProgressIndicator } from './progress-indicator'

interface StepWrapperProps {
  title: string
  description: string
  children: ReactNode
  showBack?: boolean
  onBack?: () => void
  currentStep?: number
}

export function StepWrapper({ title, description, children, showBack = true, onBack, currentStep }: StepWrapperProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Progress Indicator */}
      {currentStep && <ProgressIndicator currentStep={currentStep} totalSteps={8} />}

      {showBack && (
        <div className="mb-4">
          <Button variant="ghost" onClick={handleBack} size="sm" className="hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-heading">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  )
}
