import { SignUpUserDto, UpdateConfirmUserDto, UserOutputDto } from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
  update: (UpdateUserDto: UpdateUserDto) => Promise<UpdateUserOutputDto>
}
