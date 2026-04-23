'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface StepWrapperProps {
  title: string
  description: string
  children: ReactNode
  showBack?: boolean
  onBack?: () => void
}

export function StepWrapper({ title, description, children, showBack = true, onBack }: StepWrapperProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showBack && (
        <div className="mb-4">
          <Button variant="ghost" onClick={handleBack} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  )
}
