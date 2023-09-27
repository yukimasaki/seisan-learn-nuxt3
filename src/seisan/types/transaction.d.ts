export type Transaction = {
  id: number,
  creatorId: number,
  editorId: number,
  amount: number,
  paymentDate: Date,
  title: string,
  memo: string,
  status: string,
  categoryId: number,
  category: {
    id: number,
    category: string,
    icon: string,
    groupId: number,
  },
  groupId: number,
}
