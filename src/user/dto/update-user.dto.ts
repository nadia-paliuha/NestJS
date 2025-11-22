import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  username?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d{10,15}$/, { message: 'Invalid phone number format' })
  phone?: string;
}
