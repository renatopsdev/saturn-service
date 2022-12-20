import { IUser } from '@/domain/protocols/user'
import {
  SignUpUserDto,
  UpdateConfirmUserDto,
  UserOutputDto,
  UpdateUserOutputDto,
  UpdateUserDto,
  RedefineUserPasswordDto
} from '@/main/dtos/user'
import { fixtureUpdateUserOutput, fixtureUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

export const mockUserController = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixtureUserOutput()))
    }

    async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
      return await Promise.resolve()
    }

    async update (updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
      return await Promise.resolve(fixtureUpdateUserOutput())
    }

    async redefineUserPassword (redefineUserPasswordDto: RedefineUserPasswordDto): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new UserStub()
}
