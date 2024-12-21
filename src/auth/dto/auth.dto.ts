import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/create-user.dto';

export class AuthDto extends PickType(UserDto, ['username', 'password']) {}
