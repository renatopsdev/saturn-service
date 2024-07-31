import { MissingMandatoryParamError } from '@/presentation/errors';
import type { IValidation } from '@/presentation/protocols/validation';

export class RequiredField implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: string): Error | null {
    if (!input[this.fieldName]) {
      return new MissingMandatoryParamError(this.fieldName).serializeErrors();
    }
    return null;
  }
}
