import { Category } from "./category"

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
  category: Category,
  groupId: number,
}

export type TransactionForm = Omit<Transaction, 'id' | 'editorId' | 'category'> & {
  method: string,
  ratioArray: {
    id: number,
    value: number,
  }[],
  actualPaymentAmountArray: {
    id: number,
    value: number,
  }[],
}
