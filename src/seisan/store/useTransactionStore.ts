import { Transaction } from "../types/transaction";

export const useTransactionStore = () => {
  return new TransactionStore();
}

class TransactionStore {
  _state: Ref<Transaction[] | null>;
  constructor() {
    this._state = useState('transaction', () => null);
  }

  get state(): Readonly<Ref<Readonly<Transaction[]> | null>> {
    return readonly(this._state);
  }

  setTransaction(transaction: Transaction[]) {
    this._state.value = transaction;
  }
}
