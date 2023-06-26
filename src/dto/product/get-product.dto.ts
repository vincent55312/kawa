import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GetProductDto {
  @IsDefined({ message: 'ID is required' })
  @IsNotEmpty({ message: 'ID must not be empty' })
  @IsString({ message: 'ID must be a string' })
  id: string;
}
