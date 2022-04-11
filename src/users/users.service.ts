import { Injectable, NotFoundException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly PrismaService: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.PrismaService.user.create({ data: userData });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.PrismaService.user.findMany();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.PrismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    return this.PrismaService.user.update({
      where: {
        id: id,
      },
      data: userData,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.PrismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
