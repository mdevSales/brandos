// Voice Profile (in-memory only, never persisted)
export interface VoiceProfile {
  writingSample?: string
  tonePreferences: {
    naturalSound: string
    fakeTone: string
    bannedWords: string[]
    toneToAvoid: string
    preferredLength: 'concise' | 'storytelling'
  }
  sliders: {
    conciseExpressive: number // 0-100
    warmAuthoritative: number
    reflectiveTactical: number
    casualPolished: number
  }
  summary: string // AI-generated voice DNA
  bannedPhrases: string[]
}

// Identity data (in-memory during session)
export interface IdentityData {
  name: string
  role: string
  industry: string
  knownFor: string
  whoTheyHelp: string
  problemsSolved: string
  differentiation: string
}

export interface IdentityOutputs {
  positioningStatements: string[]
  headlines: string[]
  helpStatement: string
}

// Authority data
export interface AuthorityData {
  wins: string[]
  challenges: string[]
  strengths: string
  keyProject: string
}

export interface AuthorityOutputs {
  inventory: string
  proofPoints: string[]
  credibilityParagraph: string
}

// Perspective data
export interface PerspectiveData {
  beliefs: string
  disagreements: string
  overrated: string
  underrated: string
}

export interface PerspectiveOutputs {
  contentPillars: string[]
  postAngles: string[]
}

// Profile data
export interface ProfileData {
  currentHeadline: string
  currentAbout: string
  experience: string
}

export interface ProfileOutputs {
  rewrittenHeadline: string
  improvedAbout: string
  betterRoleDescription: string
}

// Content data
export interface ContentData {
  topics: string[]
  postTypes: string[]
}

export interface ContentOutputs {
  postIdeas: string[]
  fullPosts: string[]
  hooks: string[]
}

// 30-Day Plan
export interface PlanOutputs {
  weeklyPlan: string[]
  postingCadence: string
  engagementStrategy: string
}

// Complete session state (held in React state during workflow)
export interface SessionState {
  userId?: string
  name: string
  email: string
  voice?: VoiceProfile
  identity?: IdentityData
  identityOutputs?: IdentityOutputs
  authority?: AuthorityData
  authorityOutputs?: AuthorityOutputs
  perspective?: PerspectiveData
  perspectiveOutputs?: PerspectiveOutputs
  profile?: ProfileData
  profileOutputs?: ProfileOutputs
  content?: ContentData
  contentOutputs?: ContentOutputs
  plan?: PlanOutputs
  currentStep: number
}

// Email reminder frequencies
export type ReminderFrequency = 'light' | 'standard' | 'intensive'

// Email types
export type EmailType =
  | 'packet'
  | 'reminder_24h'
  | 'reminder_weekly'
  | 'reminder_inactive'
