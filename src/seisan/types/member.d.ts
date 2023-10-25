import { Group } from "./group";
import { User } from "./user";

export type Member = {
  userId: number,
  groupId: number,
  group: Group,
}

export type MemberInUserOmitPassword = Member & {
  group: Group,
}

export type MemberInfo = Member & {
  user: User
}
