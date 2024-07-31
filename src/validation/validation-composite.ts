import type { IValidation } from '@/presentation/protocols/validation';

export class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}

  validate(input: string): Error | null {
    // eslint-disable-next-line no-restricted-syntax
    for (const validation of this.validations) {
      const isError = validation.validate(input);
      if (isError) {
        return isError;
      }
    }
    return null;
  }
}
