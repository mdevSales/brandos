import { NextResponse } from 'next/server'
import { generateAuthorityOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { data, voice } = await request.json()

    console.log('Generating authority for:', data)
    const outputs = await generateAuthorityOutputs(data, voice)
    console.log('Raw AI outputs:', outputs)

    const safeOutputs = {
      inventory: outputs.inventory || 'Authority summary',
      proofPoints: outputs.proofPoints || [],
      credibilityParagraph: outputs.credibilityParagraph || 'Credibility statement',
    }

    console.log('Safe outputs being returned:', safeOutputs)
    return NextResponse.json(safeOutputs)
  } catch (error) {
    console.error('Error generating authority outputs:', error)
    return NextResponse.json(
      { error: 'Failed to generate authority outputs' },
      { status: 500 }
    )
  }
}
