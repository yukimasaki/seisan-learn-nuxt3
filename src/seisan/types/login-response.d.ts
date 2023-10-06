import { UserOmitPassword } from "./user-omit-password"

export type LoginResponse = {
  userOmitPassword: UserOmitPassword,
  tokens: {
    access_token: string,
    refresh_token: string,
    session_id: string,
  }
}
