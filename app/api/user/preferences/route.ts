import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { userId, frequency, timezone } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    await prisma.emailPreference.upsert({
      where: { userId },
      create: {
        userId,
        frequency: frequency || 'standard',
        timezone: timezone || 'America/Los_Angeles',
      },
      update: {
        frequency: frequency || 'standard',
        timezone: timezone || 'America/Los_Angeles',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving preferences:', error)
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    )
  }
}
