import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    const users = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Post()
  async createUsers(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    const data = await this.usersService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async uppdateUser(
    @Param('id') id: number,
    @Body() data: Partial<UpdateUserDto>,
  ) {
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
