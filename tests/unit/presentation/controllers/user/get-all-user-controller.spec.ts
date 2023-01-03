import { IUser } from '@/domain/protocols/user'
import { GetUserDto } from '@/main/dtos/user'
import { GetAllUserController } from '@/presentation/controllers/user/get-all-user-controller'
import { mocksUserController } from '@/tests/unit/presentation/mocks/mocks-user-controller'
import MockDate from 'mockdate'

type SutTypes = {
  sut: GetAllUserController
  userStub: IUser
}
const makeSut = (): SutTypes => {
  const userStub = mocksUserController()
  const sut = new GetAllUserController(userStub)

  return {
    sut,
    userStub
  }
}

describe('getAllUserController', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  it('Should call getAllUsers method with correct values', async () => {
    const { sut, userStub } = makeSut()
    const getUserDto: GetUserDto = {
      userId: 'foo',
      document: '11111111',
      startDate: new Date(),
      endDate: new Date()
    }
    const getAllUserSpy = jest
      .spyOn(userStub, 'getAllUsers')
    await sut.handle(getUserDto)
    expect(getAllUserSpy).toHaveBeenCalledWith(getUserDto)
  })
})
