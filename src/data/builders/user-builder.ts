import { User } from '@/domain/entities/user'
import { IUserBuilder } from '@/data/protocols/user-builder'
import { UserBasicInfoType, UserType } from '@/data/types'
import { SignUpUserDto } from '@/main/dtos/user/signup-user.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

export class UserBuilder implements IUserBuilder {
  buildUserBasicInfo (
    userDto: Omit<SignUpUserDto, 'passwordConfirmation'>
  ): UserBasicInfoType {
    const user = new User().getUserBasicInfo()
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.confirmUser = userDto?.confirmUser ?? false
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return user
  }

  buildUser: (userDto: UpdateUserDto) => UserType
}
