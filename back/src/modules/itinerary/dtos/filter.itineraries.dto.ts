import { IsOptional, IsInt, IsString, Min, Max, IsNumber, IsBoolean, isEnum, IsEnum } from "class-validator";
import { Transform } from 'class-transformer';

export enum STATUS{
  UPCOMING='upcoming',
  COMPLETED='completed',
  ONGOING='ongoing'
}

export class FilterItinerariesDto {
  @IsOptional()
  @Transform(({value})=>(value?parseInt(value):null))
  @IsInt()
  @Min(1)
  page?: number=1;

  @IsOptional()
  @Transform(({value})=>(value?parseInt(value):null))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number=10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(({value})=>(value?parseInt(value):null))
  @IsNumber()
  budget?: number;

  @IsOptional()
  @Transform(({value})=>(value?parseInt(value):null))
  @IsNumber()
  userId:number;

  @IsOptional()
  @IsEnum(STATUS, {message:"Status must be either upcoming, ongoing or completed"})
  status?:STATUS;
}
