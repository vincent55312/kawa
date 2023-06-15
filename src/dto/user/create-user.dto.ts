import { IsDefined, IsNotEmpty } from 'class-validator';
import { UserType } from './user.dto';

export class CreateUserDto {
  @IsDefined({ message: 'authKey is required' })
  @IsNotEmpty({ message: 'authKey must not be empty' })
  authKey: string;

  @IsDefined({ message: 'pseudo is required' })
  @IsNotEmpty({ message: 'pseudo must not be empty' })
  pseudo: string;

  @IsDefined({ message: 'password is required' })
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string;

  @IsDefined({ message: 'userType is required' })
  @IsNotEmpty({ message: 'userType must not be empty' })
  userType: UserType;
}
