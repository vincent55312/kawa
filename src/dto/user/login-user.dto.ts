import { IsDefined, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsDefined({ message: 'pseudo is required' })
  @IsNotEmpty({ message: 'pseudo must not be empty' })
  pseudo: string;

  @IsDefined({ message: 'password is required' })
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string;
}
