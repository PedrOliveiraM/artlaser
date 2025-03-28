import bcrypt from 'bcryptjs'

export async function hashPassword(password: string) {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(password, hashedPassword)
  return isValid
}
