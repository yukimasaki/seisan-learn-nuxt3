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
  schema: Schema;

  constructor(
    schema: Schema,
  ) {
    this.errors = reactive({}) as ValidationErrors;
    this. schema = schema;
  }

  validate(
    key: string,
    value: any,
  ): boolean {
    const keys = Object.keys(this.schema) as (keyof typeof this.schema)[];
    if (!keys.includes(key)) return false;

    try {
      this.schema[key].parse(value);
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
  return new BaseValidator(schema);
}
