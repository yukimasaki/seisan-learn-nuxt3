export type Payment = {
  id: number,
  payerid: number,
  actualPaymentAmount: number,
  defaultPaymentAmount: number,
  difference: number,
  method: string,
  ratio: number,
  transactionId: number,
}

export type CreatePaymentDto = Omit<Payment, 'id' | 'transactionId'>
