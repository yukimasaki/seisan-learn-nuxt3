import * as z from 'zod';

export const useCreateItemDialogValidator = () => {
  return new CreateItemDialogValidator();
}

// todo: schema部分のみフォームごとに定義して、共通部分は基底クラスから継承させたい
const schema = {
  amount: z.number().positive(),
  category: z.string().nonempty(),
  paymentDate: z.string().nonempty(),
  memo: z.string().min(0),
  paymentMethod: z.string(),
  actualPaymentAmounts: z.array(z.number()),
};


// 以下のコード部分は共通のクラスから継承できないか？
const KEYS = Object.keys(schema) as (keyof typeof schema)[];
type Key = typeof KEYS[number];

class CreateItemDialogValidator {
  errors: { [key: string]: string };
  constructor() {
    this.errors = reactive({});
  }

  validate (
    key: Key,
    value: any,
  ) {
    try {
      schema[key].parse(value);
      this.errors[key] = '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errors[key] = error.issues[0].message;
      }
    }
  }
}
