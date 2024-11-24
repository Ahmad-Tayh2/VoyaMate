import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateCheckpointDto {
  @IsNumber()
  @IsNotEmpty()
  itineraryId: number;

  @IsDateString()
  @IsNotEmpty()
  plannedTime: Date;

  @IsBoolean()
  @IsNotEmpty()
  checked: boolean;

  @IsDecimal()
  @IsNotEmpty()
  longitude: number;

  @IsDecimal()
  @IsNotEmpty()
  latitude: number;
}
