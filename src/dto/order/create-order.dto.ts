import { IsDefined, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateOrderDto {
  @IsDefined({ message: 'userId is required' })
  @IsNotEmpty({ message: 'userId must not be empty' })
  @IsUUID(undefined, { message: 'userId must be a valid UUID' })
  userId: string;

  @IsDefined({ message: 'productId is required' })
  @IsNotEmpty({ message: 'productId must not be empty' })
  @IsUUID(undefined, { message: 'productId must be a valid UUID' })
  productId: string;

  @IsDefined({ message: 'quantity is required' })
  @Min(1, { message: 'quantity must be at least 1' })
  quantity: number;
}
