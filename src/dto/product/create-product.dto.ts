import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsDefined({ message: 'name is required' })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @IsDefined({ message: 'price is required' })
  @IsNotEmpty({ message: 'price must not be empty' })
  @IsInt({ message: 'price must be an integer' })
  @Min(0, { message: 'price must be a positive number' })
  price: number;

  @IsDefined({ message: 'stock is required' })
  @IsNotEmpty({ message: 'stock must not be empty' })
  @IsInt({ message: 'stock must be an integer' })
  @Min(0, { message: 'stock must be a positive number' })
  stock: number;

  @IsOptional()
  photo?: string;
}
