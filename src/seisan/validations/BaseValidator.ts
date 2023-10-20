import * as z from 'zod';

type ValidationErrors = {
  [key: string]: string | null,
}

type ValidationResults = {
  [key: string]: boolean,
}

type Schema = Record<
  string,
  any
>

type DefaultValues = Record<
string,
any
>

class BaseValidator {
  schema: Schema;
  errors: ValidationErrors = reactive({});
  results: ValidationResults = reactive({});
  keys: string[] = [];

  constructor(
    schema: Schema,
    defaultValues: DefaultValues,
  ) {
    this.schema = schema;
    this.keys = Object.keys(schema) as (keyof typeof schema)[];
    Object.keys(schema).map(key => {
      this.results[key] = false;
    });

    // ダイアログの初回起動時、デフォルトで設定されている値をもとにバリデーションを実行する
    Object.keys(schema).map(key => {
      Object.keys(defaultValues).map(value => {
        this.validate(key, value);
      });
      // ダイアログの初回起動時はエラーメッセージを非表示にする
      this.errors[key] = null;
    });
  }

  validate = (
    key: string,
    value: any,
  ): void => {
    if (!this.keys.includes(key)) return;
    try {
      this.schema[key].parse(value);
      this.errors[key] = null;
      this.results[key] = true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errors[key] = error.issues[0].message;
        this.results[key] = false;
      }
    }
    // console.log(this.results);
  }

  setToTrue = (
    key: string,
  ): void => {
    if (!this.keys.includes(key)) return;
    this.results[key] = true;
    console.log(this.results);

  }
}

export const useBaseValidator = (
  schema: Schema,
  defaultValues: DefaultValues,
) => {
  return new BaseValidator(
    schema,
    defaultValues,
  );
}
