import { Group } from "./group";

export type Member = {
  userId: number,
  groupId: number,
}

export type MemberInUserOmitPassword = Member & {
  group: Group,
}

export type MemberInfo = Member & {
  user: User
}
