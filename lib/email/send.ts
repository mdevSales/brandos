import { Resend } from 'resend'
import { prisma } from '../db'
import { EmailType } from '../types'
import {
  getPacketEmail,
  get24HourReminderEmail,
  getWeeklyReminderEmail,
  getInactivityReminderEmail,
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'BrandOS <hello@brandos.app>' // Update with your verified domain

interface SendEmailParams {
  to: string
  subject: string
  html: string
  userId: string
  type: EmailType
}

export async function sendEmail({
  to,
  subject,
  html,
  userId,
  type,
}: SendEmailParams) {
  try {
    // Add unsubscribe link
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?userId=${userId}`
    const finalHtml = html.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl)

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: finalHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send email')
    }

    // Log email sent
    await prisma.emailLog.create({
      data: {
        userId,
        type,
        sentAt: new Date(),
      },
    })

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Send email error:', error)
    throw error
  }
}

export async function sendPacketEmail(
  userId: string,
  email: string,
  name: string,
  packetUrl: string
) {
  const template = getPacketEmail({ name, packetUrl })

  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    userId,
    type: 'packet',
  })
}

export async function send24HourReminder(
  userId: string,
  email: string,
  name: string
) {
  // Check if already sent
  const existing = await prisma.emailLog.findFirst({
    where: {
      userId,
      type: 'reminder_24h',
    },
  })

  if (existing) return { success: false, reason: 'already_sent' }

  const template = get24HourReminderEmail(name)

  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    userId,
    type: 'reminder_24h',
  })
}

export async function sendWeeklyReminder(
  userId: string,
  email: string,
  name: string,
  frequency: 'light' | 'standard' | 'intensive'
) {
  const template = getWeeklyReminderEmail(name, frequency)

  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    userId,
    type: 'reminder_weekly',
  })
}

export async function sendInactivityReminder(
  userId: string,
  email: string,
  name: string
) {
  const template = getInactivityReminderEmail(name)

  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    userId,
    type: 'reminder_inactive',
  })
}

// Check if user has unsubscribed
export async function isUnsubscribed(userId: string): Promise<boolean> {
  const preference = await prisma.emailPreference.findUnique({
    where: { userId },
  })

  return preference?.unsubscribed ?? false
}

// Get users who need reminders
export async function getUsersForReminders() {
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Get users who completed but haven't opened packet (24h reminder)
  const needsImmediate = await prisma.user.findMany({
    where: {
      sessions: {
        some: {
          completedAt: {
            gte: yesterday,
            lte: now,
          },
          packetSent: true,
        },
      },
      emailPreference: {
        unsubscribed: false,
      },
      emailLogs: {
        none: {
          type: 'reminder_24h',
        },
      },
    },
    include: {
      emailPreference: true,
    },
  })

  // Get users for weekly reminders
  const needsWeekly = await prisma.user.findMany({
    where: {
      sessions: {
        some: {
          completedAt: {
            lte: weekAgo,
          },
        },
      },
      emailPreference: {
        unsubscribed: false,
        frequency: {
          in: ['standard', 'intensive'],
        },
      },
    },
    include: {
      emailPreference: true,
    },
  })

  // Get inactive users (started but didn't complete)
  const needsInactive = await prisma.user.findMany({
    where: {
      sessions: {
        some: {
          completedAt: null,
          startedAt: {
            lte: weekAgo,
          },
        },
      },
      emailPreference: {
        unsubscribed: false,
      },
      emailLogs: {
        none: {
          type: 'reminder_inactive',
        },
      },
    },
  })

  return {
    immediate: needsImmediate,
    weekly: needsWeekly,
    inactive: needsInactive,
  }
}
