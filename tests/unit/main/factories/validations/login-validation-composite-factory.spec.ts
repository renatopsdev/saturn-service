import { makeLoginValidationCompositeFactory } from '@/main/factories/validations/login-validation-composite-factory'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidation } from '@/validation/email-validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mock-user-validation'

jest.mock('@/validation/validation-composite')

describe('LoginValidationCompositeFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidationCompositeFactory()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredField(field))
    }
    validations.push(
      new EmailValidation('email', mockEmailValidator())
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
