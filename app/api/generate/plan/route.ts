import { NextResponse } from 'next/server'
import { generatePlanOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { voice } = await request.json()

    const outputs = await generatePlanOutputs(voice)

    const safeOutputs = {
      weeklyPlan: outputs.weeklyPlan || [],
      postingCadence: outputs.postingCadence || 'Post 2-3 times per week',
      engagementStrategy: outputs.engagementStrategy || 'Engage before you post',
    }

    return NextResponse.json(safeOutputs)
  } catch (error) {
    console.error('Error generating plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    )
  }
}
