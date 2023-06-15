import { IsDefined, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsDefined({ message: 'token is required' })
  @IsNotEmpty({ message: 'token must not be empty' })
  token: string;

  @IsDefined({ message: 'pseudo is required' })
  @IsNotEmpty({ message: 'pseudo must not be empty' })
  pseudo: string;

  @IsDefined({ message: 'password is required' })
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string;
}
