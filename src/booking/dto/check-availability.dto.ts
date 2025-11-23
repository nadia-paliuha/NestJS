import { IsDateString, IsInt, Min, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckAvailabilityDto {
  @IsDateString()
  date: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  numGuests: number;

  @Matches(/^\d{2}:\d{2}$/)
  start_time: string;

  @Matches(/^\d{2}:\d{2}$/)
  end_time: string;
}
