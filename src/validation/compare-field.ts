import type { IValidation } from '@/presentation/protocols/validation';
import { InvalidParamError } from '@/presentation/errors';

export class CompareField implements IValidation {
  constructor(
    private readonly field: string,
    private readonly fieldCompare: string,
  ) {}

  validate(input: string): Error | null {
    if (input[this.field] !== input[this.fieldCompare]) {
      return new InvalidParamError(this.fieldCompare).serializeErrors();
    }
    return null;
  }
}
