import { Member } from "./member"

export type User = {
  id: number,
  email: string,
  displayName: string,
  membership: string,
  hashedPassword: string,
  members: Member[],
}

export type UserOmitPassword = Omit<User, 'id' | 'hashedPassword'>
