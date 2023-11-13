import { CreatePaymentDto } from "../types/payment";
import { TransactionForm } from "../types/transaction";

export const parseTransaction = () => {
  const createPayment = (
    transactionForm: TransactionForm,
  ): CreatePaymentDto => {
    const memberCount: number = transactionForm.actualPaymentAmountArray.length;
    const creatorId: number = transactionForm.creatorId;

    // 作成者を含むメンバーの情報

    // 作成者の情報

    // 統合して返却
  }

  const createBalance = () => { }

  const createTransaction = () => { }

  return {
    createPayment,
    createBalance,
    createTransaction,
  }
}
