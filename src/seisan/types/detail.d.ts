export type Detail = {
  id: number,
  genre: string,
  amount: number,
  paymentMethod: string,
  paymentDate: Dayjs,
  memo: string,
  paidStatus: boolean,
  createdAt: Dayjs,
}
