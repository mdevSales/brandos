import { VoiceProfile } from '../types'

// Generate system prompt that includes voice profile
export function getSystemPrompt(voice?: VoiceProfile): string {
  if (!voice) {
    return `You are an expert LinkedIn brand strategist and copywriter. Generate authentic, human content that avoids generic AI tone and clichés.`
  }

  const bannedPhrasesList = voice.bannedPhrases && voice.bannedPhrases.length > 0
    ? `NEVER use: ${voice.bannedPhrases.join(', ')}`
    : ''

  const bannedWordsList = voice.tonePreferences?.bannedWords && voice.tonePreferences.bannedWords.length > 0
    ? `Avoid: ${voice.tonePreferences.bannedWords.join(', ')}`
    : ''

  return `You are an expert LinkedIn brand strategist and copywriter.

VOICE PROFILE:
${voice.summary || 'Professional and authentic'}

TONE CALIBRATION:
- Natural sound: ${voice.tonePreferences?.naturalSound || 'authentic'}
- Fake tone to avoid: ${voice.tonePreferences?.fakeTone || 'overly promotional'}
- Tone to avoid: ${voice.tonePreferences?.toneToAvoid || 'generic'}
- Preferred length: ${voice.tonePreferences?.preferredLength || 'concise'}

SLIDER SETTINGS:
- Concise (0) ↔ Expressive (100): ${voice.sliders?.conciseExpressive || 50}
- Warm (0) ↔ Authoritative (100): ${voice.sliders?.warmAuthoritative || 50}
- Reflective (0) ↔ Tactical (100): ${voice.sliders?.reflectiveTactical || 50}
- Casual (0) ↔ Polished (100): ${voice.sliders?.casualPolished || 50}

${bannedPhrasesList}
${bannedWordsList}

${voice.writingSample ? `WRITING SAMPLE:\n${voice.writingSample}` : ''}

CRITICAL RULES:
- Match the voice profile exactly
- Avoid generic LinkedIn clichés
- No motivational platitudes
- Each output must sound distinct
- Prioritize authenticity over polish`
}

// Voice calibration prompt
export const VOICE_CALIBRATION_PROMPT = `Based on the user's writing sample and tone preferences, create a voice profile summary.

Output as JSON:
{
  "summary": "2-3 sentence description of their natural voice and style",
  "bannedPhrases": ["phrase1", "phrase2", ...] // Common LinkedIn clichés to avoid based on their preferences
}

Focus on:
- What makes their voice distinct
- Natural patterns in their writing
- How to avoid generic AI tone
- What would feel inauthentic to them`

// Identity generation prompts
export function getIdentityPrompt(data: any): string {
  return `Generate LinkedIn positioning based on:

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
}

Requirements:
- Positioning statements should be concise (1-2 sentences)
- Headlines must be under 220 characters
- Each option should feel distinct
- Avoid buzzwords and clichés
- Make it specific and memorable`
}

// Authority generation prompt
export function getAuthorityPrompt(data: any): string {
  return `Generate authority inventory based on:

Wins: ${JSON.stringify(data.wins)}
Challenges: ${JSON.stringify(data.challenges)}
Strengths: ${data.strengths}
Key project: ${data.keyProject}

Output as JSON:
{
  "inventory": "Comprehensive authority summary paragraph",
  "proofPoints": ["proof1", "proof2", "proof3", "proof4", "proof5"],
  "credibilityParagraph": "Compelling credibility statement"
}

Requirements:
- Proof points should be concrete and specific
- Highlight transformation and results
- Connect challenges to expertise
- Avoid humble-bragging tone`
}

// Perspective generation prompt
export function getPerspectivePrompt(data: any): string {
  return `Generate content strategy based on:

Beliefs: ${data.beliefs}
Disagreements: ${data.disagreements}
Overrated: ${data.overrated}
Underrated: ${data.underrated}

Output as JSON:
{
  "contentPillars": ["pillar1", "pillar2", "pillar3"],
  "postAngles": ["angle1", "angle2", "angle3", "angle4", "angle5"]
}

Requirements:
- Content pillars should be clear themes
- Post angles should be specific story/topic ideas
- Each should reflect their unique perspective
- Avoid generic content strategy advice`
}

// Profile rewrite prompt
export function getProfilePrompt(data: any): string {
  return `Rewrite LinkedIn profile sections:

Current headline: ${data.currentHeadline}
Current about: ${data.currentAbout}
Experience: ${data.experience}

Output as JSON:
{
  "rewrittenHeadline": "New headline under 220 characters",
  "improvedAbout": "Rewritten About section (3-5 paragraphs)",
  "betterRoleDescription": "Enhanced experience description"
}

Requirements:
- Headline must be compelling and clear
- About should tell a story
- Use first person
- Include credentials naturally
- End with call-to-action in About`
}

// Content generation prompt
export function getContentPrompt(data: any, voice?: VoiceProfile): string {
  return `Generate LinkedIn content ideas and posts:

Topics: ${JSON.stringify(data.topics)}
Post types: ${JSON.stringify(data.postTypes)}

Output as JSON:
{
  "postIdeas": ["idea1", "idea2", ... 10 total],
  "fullPosts": ["post1", "post2", "post3"],
  "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5"]
}

Requirements:
- Post ideas should be specific, not generic
- Full posts should be 150-250 words
- Posts must match voice profile EXACTLY
- Hooks should be attention-grabbing first lines
- Each post should feel different
- No motivational clichés
- Include line breaks for readability in full posts`
}

// 30-day plan prompt
export function getPlanPrompt(voice?: VoiceProfile): string {
  return `Generate a 30-day LinkedIn posting plan.

Output as JSON:
{
  "weeklyPlan": ["Week 1: ...", "Week 2: ...", "Week 3: ...", "Week 4: ..."],
  "postingCadence": "Recommended posting frequency and timing",
  "engagementStrategy": "How to engage with content between posts"
}

Requirements:
- Weekly plan should include themes and post types
- Be realistic and sustainable
- Include engagement tactics
- Balance different content types`
}
