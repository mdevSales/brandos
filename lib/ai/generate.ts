import Anthropic from '@anthropic-ai/sdk'
import { VoiceProfile } from '../types'
import { getSystemPrompt } from './prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface GenerateOptions {
  prompt: string
  voice?: VoiceProfile
  temperature?: number
}

export async function generateWithClaude({
  prompt,
  voice,
  temperature = 0.7,
}: GenerateOptions): Promise<any> {
  const systemPrompt = getSystemPrompt(voice)

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const textContent = message.content.find((c) => c.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response')
  }

  // Extract JSON from response
  const text = textContent.text
  const jsonMatch = text.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    console.error('Failed to extract JSON from response:', text)
    throw new Error('Failed to parse AI response')
  }

  return JSON.parse(jsonMatch[0])
}

// Specific generation functions

export async function generateVoiceProfile(
  writingSample: string,
  preferences: any
): Promise<{ summary: string; bannedPhrases: string[] }> {
  const prompt = `Based on this writing sample and preferences, create a voice profile:

Writing sample: ${writingSample}
Natural sound: ${preferences.naturalSound}
Fake tone to avoid: ${preferences.fakeTone}
Banned words: ${JSON.stringify(preferences.bannedWords)}
Tone to avoid: ${preferences.toneToAvoid}
Preferred length: ${preferences.preferredLength}

Output as JSON:
{
  "summary": "2-3 sentence description of their natural voice",
  "bannedPhrases": ["phrase1", "phrase2", "phrase3"]
}`

  return generateWithClaude({ prompt, temperature: 0.8 })
}

export async function generateIdentityOutputs(
  data: any,
  voice?: VoiceProfile
) {
  const prompt = `Generate LinkedIn positioning based on:

Name: ${data.name}
Role: ${data.role}
Industry: ${data.industry}
Known for: ${data.knownFor}
Who they help: ${data.whoTheyHelp}
Problems solved: ${data.problemsSolved}
Differentiation: ${data.differentiation}

Output as JSON:
{
  "positioningStatements": ["statement1", "statement2", "statement3"],
  "headlines": ["headline1", "headline2", "headline3"],
  "helpStatement": "I help X do Y through Z"
}`

  return generateWithClaude({ prompt, voice })
}

export async function generateAuthorityOutputs(
  data: any,
  voice?: VoiceProfile
) {
  const prompt = `Generate authority content based on:

Wins: ${JSON.stringify(data.wins)}
Challenges: ${JSON.stringify(data.challenges)}
Strengths: ${data.strengths}
Key project: ${data.keyProject}

Output as JSON:
{
  "inventory": "Authority summary paragraph",
  "proofPoints": ["proof1", "proof2", "proof3", "proof4", "proof5"],
  "credibilityParagraph": "Credibility statement"
}`

  return generateWithClaude({ prompt, voice })
}

export async function generatePerspectiveOutputs(
  data: any,
  voice?: VoiceProfile
) {
  const prompt = `Generate content strategy based on:

Beliefs: ${data.beliefs}
Disagreements: ${data.disagreements}
Overrated: ${data.overrated}
Underrated: ${data.underrated}

Output as JSON:
{
  "contentPillars": ["pillar1", "pillar2", "pillar3"],
  "postAngles": ["angle1", "angle2", "angle3", "angle4", "angle5"]
}`

  return generateWithClaude({ prompt, voice })
}

export async function generateProfileOutputs(
  data: any,
  voice?: VoiceProfile
) {
  const prompt = `Rewrite LinkedIn profile sections:

Current headline: ${data.currentHeadline}
Current about: ${data.currentAbout}
Experience: ${data.experience}

Output as JSON:
{
  "rewrittenHeadline": "New headline under 220 characters",
  "improvedAbout": "Rewritten About section",
  "betterRoleDescription": "Enhanced experience description"
}`

  return generateWithClaude({ prompt, voice })
}

export async function generateContentOutputs(
  data: any,
  voice?: VoiceProfile
) {
  const prompt = `Generate LinkedIn content:

Topics: ${JSON.stringify(data.topics)}
Post types: ${JSON.stringify(data.postTypes)}

Output as JSON:
{
  "postIdeas": ["idea1", "idea2", "idea3", "idea4", "idea5", "idea6", "idea7", "idea8", "idea9", "idea10"],
  "fullPosts": ["post1", "post2", "post3"],
  "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5"]
}`

  return generateWithClaude({ prompt, voice, temperature: 0.9 })
}

export async function generatePlanOutputs(voice?: VoiceProfile) {
  const prompt = `Generate a 30-day LinkedIn plan.

Output as JSON:
{
  "weeklyPlan": ["Week 1: ...", "Week 2: ...", "Week 3: ...", "Week 4: ..."],
  "postingCadence": "Recommended frequency",
  "engagementStrategy": "Engagement tactics"
}`

  return generateWithClaude({ prompt, voice })
}
