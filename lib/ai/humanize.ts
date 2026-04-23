import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/**
 * Humanizes AI-generated text by removing common AI writing patterns
 * and making it sound more natural and conversational for LinkedIn.
 */
export async function humanizeText(text: string): Promise<string> {
  const prompt = `You are a writing editor removing AI-sounding patterns from LinkedIn content. Make this text sound more human and natural while keeping it professional and appropriate for LinkedIn.

Key fixes to apply:
- Remove phrases like "serves as", "testament to", "pivotal moment", "landscape", "showcasing"
- Replace with simple verbs: use "is" instead of "serves as", "has" instead of "boasts"
- Cut promotional language: "vibrant", "groundbreaking", "nestled", "breathtaking"
- Remove vague claims: "experts believe", "industry observers note"
- Cut filler: "in order to" → "to", "due to the fact that" → "because"
- Remove rule-of-three patterns if forced
- No em dash overuse - use commas or periods
- Vary sentence length naturally
- Make it conversational but professional
- Keep first-person where appropriate ("I help..." not "helps...")

Text to humanize:
"""
${text}
"""

Return ONLY the humanized version, nothing else. No explanations, no commentary, just the improved text.`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2048,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const textContent = message.content.find((c) => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      // Fallback: return original if humanization fails
      console.warn('Humanization failed, returning original text')
      return text
    }

    return textContent.text.trim()
  } catch (error) {
    console.error('Error humanizing text:', error)
    // Fallback: return original text if API call fails
    return text
  }
}

/**
 * Humanizes an array of strings (like positioning statements or post ideas)
 */
export async function humanizeArray(items: string[]): Promise<string[]> {
  // Process in parallel for better performance
  const promises = items.map((item) => humanizeText(item))
  return Promise.all(promises)
}

/**
 * Humanizes specific fields in a generated object
 */
export async function humanizeObject<T extends Record<string, any>>(
  obj: T,
  fieldsToHumanize: (keyof T)[]
): Promise<T> {
  const humanized = { ...obj }

  for (const field of fieldsToHumanize) {
    const value = obj[field]

    if (typeof value === 'string') {
      humanized[field] = await humanizeText(value) as T[keyof T]
    } else if (Array.isArray(value) && value.every((v: any) => typeof v === 'string')) {
      humanized[field] = await humanizeArray(value) as T[keyof T]
    }
  }

  return humanized
}
