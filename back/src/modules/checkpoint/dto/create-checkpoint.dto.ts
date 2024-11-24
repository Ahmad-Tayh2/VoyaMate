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

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6 })
  @IsNotEmpty()
  longitude: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6 })
  @IsNotEmpty()
  latitude: number;
}
