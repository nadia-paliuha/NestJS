import { IsInt, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateTableDto {
  @IsInt()
  number: number;

  @IsInt()
  num_of_seats: number;

  @IsOptional()
  @IsString()
  location?: string; 

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsInt()
  restaurantId: number; 
}