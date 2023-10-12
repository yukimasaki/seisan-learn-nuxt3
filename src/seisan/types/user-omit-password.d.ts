type Member = {
  userId: number,
  groupId: number,
  group: Group,
}

type Group = {
  id: number,
  uid: string,
  displayName: string,
}

export type UserOmitPassword = {
  email: string,
  displayName: string,
  membership: string,
  members: Member[],
}
