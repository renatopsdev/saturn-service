import type { IUserRepository } from '@/data/protocols/user-repository';
import type {
  SignUpUserDto,
  LoadUserDto,
  UserOutputDto,
  UpdateConfirmUserDto,
  UpdateUserPasswordDto,
  GetUserOutputDto,
  FilterUserDto,
} from '@/main/dtos/user';
import { type UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto';
import { type UpdateUserDto } from '@/main/dtos/user/update-user.dto';
import { type Collection, ObjectId } from 'mongodb';
import * as utils from '@/main/utils';
import type { AddressDto } from '@/main/dtos/address/address.dto';
import { MongoHelper } from './mongo-helper';
import { ObjectFields } from '@/main/utils';

export class UserRepositoryMongoAdapter implements IUserRepository {
  private userCollection: Collection;

  async create(userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const createUser = await this.getUserCollection().insertOne(userDto);
    const user = await this.getUserCollection().findOne(
      { _id: createUser.insertedId },
      {
        projection: {
          name: 1,
          email: 1,
        },
      },
    );
    return MongoHelper.map(user);
  }

  async loadByEmail(email: string): Promise<LoadUserDto | null> {
    const user = await this.getUserCollection().findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          password: 1,
        },
      },
    );
    return user && MongoHelper.map(user);
  }

  async updateAccessToken(userId: string, token: string): Promise<void> {
    await this.getUserCollection().updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          accessToken: token,
        },
      },
    );
  }

  async loadByToken(accessToken: string, role?: string): Promise<LoadUserDto | null> {
    const user = await this.getUserCollection().findOne(
      {
        accessToken,
        $or: [{ role }, { role: 'admin' }],
      },
      {
        projection: {
          _id: 1,
        },
      },
    );

    return user && MongoHelper.map(user);
  }

  async updateConfirmUser(updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
    const { confirmUser, userId } = updateConfirmUserDto;
    await this.getUserCollection().findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          confirmUser,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      },
    );
  }

  async update(updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
    const { userId } = updateUserDto;
    const updateUser = await this.getUserCollection().findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: utils.getFieldsWithValidValues(updateUserDto as unknown as ObjectFields, 'userId'),
      },
      {
        upsert: true,
        returnDocument: 'after',
        projection: {
          _id: 1,
          name: 1,
          birthDate: 1,
          address: 1,
          age: 1,
          phone: 1,
          type: 1,
          document: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    );
    return MongoHelper.map(updateUser);
  }

  async updateUserPassword(updateUserPasswordDto: Omit<UpdateUserPasswordDto, 'passwordConfirmation'>): Promise<void> {
    const { userId, password } = updateUserPasswordDto;
    await this.getUserCollection().findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          password,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      },
    );
  }

  async getUser(userId: string): Promise<GetUserOutputDto | null> {
    const user = await this.getUserCollection().findOne(
      {
        _id: new ObjectId(userId),
      },
      {
        projection: {
          _id: 1,
          email: 1,
          name: 1,
          birthDate: 1,
          address: 1,
          age: 1,
          phone: 1,
          type: 1,
          confirmUser: 1,
          document: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    );
    return user && MongoHelper.map(user);
  }

  async getAllUsers(filterUserDto: FilterUserDto): Promise<GetUserOutputDto[]> {
    const { startDate, endDate, email, document } = filterUserDto;
    const filter = !(startDate ?? endDate ?? email ?? document)
      ? {}
      : {
          $or: [
            {
              email,
            },
            {
              document: document ?? '',
            },
            {
              createdAt: {
                $gte: startDate ? new Date(startDate) : '',
              },
            },
            {
              createdAt: {
                $lte: endDate ? new Date(endDate) : '',
              },
            },
          ],
        };
    const users = await this.getUserCollection()
      .find(filter, {
        projection: {
          _id: 1,
          email: 1,
          name: 1,
          birthDate: 1,
          address: 1,
          age: 1,
          phone: 1,
          type: 1,
          confirmUser: 1,
          document: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      })
      .toArray();

    return MongoHelper.mapCollection(users);
  }

  private getUserCollection(): Collection {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('users');
    }

    return this.userCollection;
  }
}
