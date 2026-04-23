import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email required' },
        { status: 400 }
      )
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    })

    // Create new user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
        },
      })
    }

    // Create new session
    const session = await prisma.session.create({
      data: {
        userId: user.id,
      },
    })

    return NextResponse.json({
      userId: user.id,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
