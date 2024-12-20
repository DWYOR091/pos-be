// import { OmitType, PickType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @ApiProperty({ required: true, example: 'kocakGaming' })
  @IsString()
  @IsNotEmpty()
  nama_user: string;

  @ApiProperty({ required: true, example: 'kocak@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: 'kocak' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true, example: 'kocak123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {} //fungsinya omitype copy class diatas untuk membuang field tertentu
export class UserIdDto extends PickType(UserDto, ['id']) {} //fungsi picktype unthku memilih field tertentu
