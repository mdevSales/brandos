import { NextResponse } from 'next/server'
import { generateContentOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { data, voice } = await request.json()

    const outputs = await generateContentOutputs(data, voice)

    const safeOutputs = {
      postIdeas: outputs.postIdeas || [],
      fullPosts: outputs.fullPosts || [],
      hooks: outputs.hooks || [],
    }

    return NextResponse.json(safeOutputs)
  } catch (error) {
    console.error('Error generating content outputs:', error)
    return NextResponse.json(
      { error: 'Failed to generate content outputs' },
      { status: 500 }
    )
  }
}
