import { useContext } from 'react'
import { ClubContext } from './ClubContext'

export function useClub() {
  const value = useContext(ClubContext)
  if (!value) {
    throw new Error('useClub must be used inside ClubProvider')
  }
  return value
}
