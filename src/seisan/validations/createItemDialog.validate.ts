import * as z from 'zod';

export const useCreateItemDialogValidator = () => {
  return new CreateItemDialogValidator();
}

const schema = {
  amount: z.number().positive(),
  category: z.string().nonempty(),
  paymentDate: z.string().nonempty(),
  memo: z.string().min(0),
  paymentMethod: z.string(),
  actualPaymentAmounts: z.array(z.number()),
}

class CreateItemDialogValidator {
  errors: { [key: string]: string };
  constructor() {
    this.errors = reactive({});
  }

  validateAmount (
    amount: any,
  ) {
    try {
      schema.amount.parse(amount);
      this.errors.amount = '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errors.amount = error.issues[0].message;
      }
    }
  }
}
