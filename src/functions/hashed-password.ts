import { hash } from 'node:crypto'

export const hashedPassword = (password: string) => {
  const hashedPassword = hash('sha256', password).toString()

  return hashedPassword
}