import { NextResponse } from 'next/server'
import { generateIdentityOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { data, voice } = await request.json()

    console.log('Generating identity for:', data)
    const outputs = await generateIdentityOutputs(data, voice)
    console.log('Raw AI outputs:', outputs)

    // Ensure arrays exist
    const safeOutputs = {
      positioningStatements: outputs.positioningStatements || [],
      headlines: outputs.headlines || [],
      helpStatement: outputs.helpStatement || 'I help clients achieve their goals.',
    }

    console.log('Safe outputs being returned:', safeOutputs)
    return NextResponse.json(safeOutputs)
  } catch (error) {
    console.error('Error generating identity outputs:', error)
    return NextResponse.json(
      { error: 'Failed to generate identity outputs' },
      { status: 500 }
    )
  }
}
