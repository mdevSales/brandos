import { ReminderFrequency } from '../types'

interface PacketEmailParams {
  name: string
  packetUrl: string
}

export function getPacketEmail({ name, packetUrl }: PacketEmailParams) {
  return {
    subject: '🎯 Your BrandOS LinkedIn Packet is Ready',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">BrandOS by Southasiaforce</h1>
  </div>

  <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="font-size: 18px; margin-top: 0;">Hey ${name},</p>

    <p>Your personalized LinkedIn brand packet is ready! 🎉</p>

    <p>Inside you'll find:</p>
    <ul style="line-height: 1.8;">
      <li>Your positioning and unique value</li>
      <li>Rewritten headline and About section</li>
      <li>Content pillars and post ideas</li>
      <li>3 ready-to-use posts</li>
      <li>Your 30-day action plan</li>
    </ul>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${packetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Download Your Packet</a>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      This link expires in 7 days. Save your packet now!
    </p>

    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
      <a href="{{unsubscribe_url}}" style="color: #6b7280;">Unsubscribe</a> from future emails
    </p>
  </div>
</body>
</html>
    `,
  }
}

export function get24HourReminderEmail(name: string) {
  return {
    subject: '⏰ Your LinkedIn packet is waiting',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <p style="font-size: 18px; margin-top: 0;">Hey ${name},</p>

    <p>Just checking in — we sent your BrandOS packet yesterday but noticed you haven't opened it yet.</p>

    <p>Quick reminder: your packet includes everything you need to start building your LinkedIn presence:</p>
    <ul style="line-height: 1.8;">
      <li>Your unique positioning</li>
      <li>Rewritten profile sections</li>
      <li>Content ideas and ready-to-use posts</li>
      <li>30-day action plan</li>
    </ul>

    <p>The download link expires in 6 days.</p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="{{packet_url}}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Get Your Packet</a>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
      <a href="{{unsubscribe_url}}" style="color: #6b7280;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}

export function getWeeklyReminderEmail(name: string, frequency: ReminderFrequency) {
  const tips = [
    'Post consistently: 2-3 times per week is better than daily then silence.',
    'Engage before you post: spend 10 minutes commenting on others\' content first.',
    'Your best posts tell a specific story, not a general truth.',
    'Don\'t just post — reply to every comment to boost engagement.',
    'LinkedIn rewards native content: write directly on the platform, don\'t just share links.',
  ]

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  return {
    subject: '💡 LinkedIn tip for this week',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <p style="font-size: 18px; margin-top: 0;">Hey ${name},</p>

    <p><strong>Quick tip for this week:</strong></p>

    <p style="font-size: 16px; padding: 20px; background: #f9fafb; border-left: 4px solid #667eea; margin: 20px 0;">
      ${randomTip}
    </p>

    <p>Keep building your brand, one post at a time.</p>

    <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
      <a href="{{unsubscribe_url}}" style="color: #6b7280;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}

export function getInactivityReminderEmail(name: string) {
  return {
    subject: '👋 Still working on your LinkedIn brand?',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <p style="font-size: 18px; margin-top: 0;">Hey ${name},</p>

    <p>It's been a week since you started your BrandOS journey.</p>

    <p>If you got stuck or haven't finished — no worries, it happens!</p>

    <p>Here's the reality: most people never get around to building their LinkedIn presence. But you already started. That puts you ahead.</p>

    <p>Even completing just your profile rewrite can make a difference.</p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/app/dashboard" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Pick Up Where You Left Off</a>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
      <a href="{{unsubscribe_url}}" style="color: #6b7280;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}
