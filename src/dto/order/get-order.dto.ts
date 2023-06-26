import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class GetOrderDto {
  @IsDefined({ message: 'id is required' })
  @IsNotEmpty({ message: 'id must not be empty' })
  @IsUUID(undefined, { message: 'id must be a valid UUID' })
  id: string;
}
