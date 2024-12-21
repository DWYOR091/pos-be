import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);

    const find = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (find) {
      throw new HttpException('email sudah ada', HttpStatus.BAD_REQUEST);
    }

    const save = await this.userRepo.save(createUserDto);
    return plainToClass(User, save);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const result = await this.userRepo.findOne({ where: { id } });
    if (!result)
      throw new HttpException('user tidak ada', HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const find = await this.userRepo.findOne({ where: { id } });
    if (!find)
      throw new HttpException('user tidak ada', HttpStatus.BAD_REQUEST);

    const findEmail = await this.userRepo.findOne({
      where: { email: updateUserDto.email },
    });

    if (findEmail && findEmail.id !== id) {
      throw new HttpException('email sudah terpakai', HttpStatus.BAD_REQUEST);
    }

    // return await this.userRepo.save({ ...find, ...updateUserDto });
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    const updateUser = this.userRepo.merge(find, updateUserDto);
    return await this.userRepo.save(updateUser);
  }

  async remove(id: number): Promise<void> {
    const find = await this.userRepo.findOne({ where: { id } });
    if (!find) throw new HttpException('User tidak ada', 404);

    await this.userRepo.remove(find);
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, 10);
  }

  async comparePassword(plainPass: string, hashPass: string): Promise<boolean> {
    return await bcrypt.compare(plainPass, hashPass);
  }

  async findUsername(username: string): Promise<User> {
    const result = this.userRepo.findOne({ where: { username } });
    if (!result)
      throw new HttpException('username tidak ada', HttpStatus.NOT_FOUND);
    return result;
  }
}
