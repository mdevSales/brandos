'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SessionState } from '@/lib/types'

interface SessionContextType {
  session: SessionState
  updateSession: (updates: Partial<SessionState>) => void
  clearSession: () => void
}

const SessionContext = createContext<SessionContextType | null>(null)

const initialSession: SessionState = {
  name: '',
  email: '',
  currentStep: 0,
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState>(initialSession)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('brandos_session')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSession(parsed)
      } catch (error) {
        console.error('Failed to parse session:', error)
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (session.name && session.email) {
      localStorage.setItem('brandos_session', JSON.stringify(session))
    }
  }, [session])

  const updateSession = (updates: Partial<SessionState>) => {
    setSession((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  const clearSession = () => {
    localStorage.removeItem('brandos_session')
    setSession(initialSession)
  }

  return (
    <SessionContext.Provider value={{ session, updateSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return context
}
