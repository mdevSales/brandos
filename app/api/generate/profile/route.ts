import { NextResponse } from 'next/server'
import { generateProfileOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { data, voice } = await request.json()

    const outputs = await generateProfileOutputs(data, voice)

    const safeOutputs = {
      rewrittenHeadline: outputs.rewrittenHeadline || '',
      improvedAbout: outputs.improvedAbout || '',
      betterRoleDescription: outputs.betterRoleDescription || '',
    }

    return NextResponse.json(safeOutputs)
  } catch (error) {
    console.error('Error generating profile outputs:', error)
    return NextResponse.json(
      { error: 'Failed to generate profile outputs' },
      { status: 500 }
    )
  }
}
