import { IsNumber } from "class-validator";

export class PayloadDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  itineraryId: number;
}