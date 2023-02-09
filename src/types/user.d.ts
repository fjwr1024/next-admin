export interface Users {
  id: string
  email: string
  password: string
  walletAddress: string
  tickets: number
  role: UserStatus
  stripeCustomerId: string
  createdAt: string
  updatedAt: string
}

export enum UserStatus {
  User = 'user',
  Admin = 'admin',
}
