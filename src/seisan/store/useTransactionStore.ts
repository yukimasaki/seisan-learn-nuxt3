import { Transaction } from "../types/transaction";

export const useTransactionStore = () => {
  return new TransactionStore();
}

class TransactionStore {
  _state: Ref<Transaction[]>;
  constructor() {
    this._state = useState('transaction', () => []);
  }

  get state(): Readonly<Ref<readonly Transaction[]>> {
    return readonly(this._state);
  }

  setTransaction(transaction: Transaction[]) {
    this._state.value = transaction;
  }
}
