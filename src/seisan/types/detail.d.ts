export type Detail = {
  id: number,
  categories: string,
  amount: number,
  paymentMethod: string,
  paymentDate: Dayjs,
  memo: string,
  paidStatus: boolean,
  createdAt: Dayjs,
}
