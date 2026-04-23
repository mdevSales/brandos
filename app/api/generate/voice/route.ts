import { NextResponse } from 'next/server'
import { generateVoiceProfile } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { writingSample, preferences, sliders } = await request.json()

    // Generate voice profile
    const voiceProfile = await generateVoiceProfile(writingSample || '', preferences)

    // Ensure bannedPhrases is always an array
    if (!voiceProfile.bannedPhrases) {
      voiceProfile.bannedPhrases = []
    }

    return NextResponse.json(voiceProfile)
  } catch (error) {
    console.error('Error generating voice profile:', error)
    return NextResponse.json(
      { error: 'Failed to generate voice profile' },
      { status: 500 }
    )
  }
}
