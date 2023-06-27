import { IsDefined, IsNotEmpty } from 'class-validator';

export class LoginUserQrcodeDto {
  @IsDefined({ message: 'passphrase is required' })
  @IsNotEmpty({ message: 'passphrase must not be empty' })
  passphrase: string;
}
