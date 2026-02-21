
export interface User {
  id: string
  email: string
  name: string
  password: string
  role: string
  status: string
  emailVerified: boolean
  failedLoginAttempts: string
  createdAt: Date
  updatedAt: Date
}
