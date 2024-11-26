import { IsNumber, IsOptional, IsString, IsArray, IsInt } from 'class-validator';

export class ItineraryResponseDto {
  @IsNumber()
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsInt()
  budget: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  ownerId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  membersIds: number[];
}
