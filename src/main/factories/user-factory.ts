import { User } from '@/data/use-cases/user'
import { UserBuilder } from '@/data/builders/user-builder'
import { IController } from '@/presentation/protocols/controller'
import {
  SignUpUserController,
  SignInUserController,
  UpdateUserController,
  UpdateConfirmUserController,
  UpdateUserPasswordController,
  GetUserController
} from '@/presentation/controllers/user'
import {
  makeSignUpValidationCompositeFactory,
  makeSignInValidationCompositeFactory,
  makeUpdateUserValidationCompositeFactory,
  makeUpdateUserPasswordValidationCompositeFactory
} from '@/main/factories/validations'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import dotenv from 'dotenv'

dotenv.config()
export const signUpFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter(),
    new UserBuilder()
  )
  return new SignUpUserController(user, makeSignUpValidationCompositeFactory(), user)
}

export const signInFactory = (): IController => {
  const authentication = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new SignInUserController(authentication, makeSignInValidationCompositeFactory())
}

export const updateConfirmUserFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new UpdateConfirmUserController(user)
}

export const updateUserFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter(),
    new UserBuilder()
  )
  return new UpdateUserController(user, makeUpdateUserValidationCompositeFactory())
}

export const updateUserPasswordFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new UpdateUserPasswordController(user, makeUpdateUserPasswordValidationCompositeFactory())
}

export const getUserFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new GetUserController(user)
}
