import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddOrUpdateItineraryDTO{

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsOptional()
    @IsNumber()
    budget:number;
}