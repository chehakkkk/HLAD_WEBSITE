"use client";
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [activeSectionId, setActiveSectionIdState] = useState('home')

  const setActiveSectionId = useCallback((id) => {
    setActiveSectionIdState(id || 'home')
  }, [])

  const value = useMemo(
    () => ({ activeSectionId, setActiveSectionId }),
    [activeSectionId, setActiveSectionId],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

/* eslint-disable react-refresh/only-export-components -- hook paired with provider */
export function useNavigationSection() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigationSection must be used within NavigationProvider')
  return ctx
}
