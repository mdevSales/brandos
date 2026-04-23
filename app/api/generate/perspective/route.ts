import { NextResponse } from 'next/server'
import { generatePerspectiveOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { data, voice } = await request.json()

    const outputs = await generatePerspectiveOutputs(data, voice)

    const safeOutputs = {
      contentPillars: outputs.contentPillars || [],
      postAngles: outputs.postAngles || [],
    }

    return NextResponse.json(safeOutputs)
  } catch (error) {
    console.error('Error generating perspective outputs:', error)
    return NextResponse.json(
      { error: 'Failed to generate perspective outputs' },
      { status: 500 }
    )
  }
}
