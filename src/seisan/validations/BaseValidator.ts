import * as z from 'zod';

type ValidationErrors = {
  [key: string]: string,
}

type Schema = Record<
  string,
  any
>;

class BaseValidator {
  errors: ValidationErrors;
  constructor() {
    this.errors = reactive({}) as ValidationErrors;
  }

  validate(
    schema: Schema,
    key: string,
    value: any,
  ): boolean {
    const keys = Object.keys(schema) as (keyof typeof schema)[];
    if (!keys.includes(key)) return false;

    try {
      schema[key].parse(value);
      this.errors[key] = '';
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errors[key] = error.issues[0].message;
        return false;
      }

      return false;
    }
  }
}

export const useBaseValidator = (
  schema: Schema,
) => {
  return new BaseValidator();
}
