import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddItineraryDTO{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    budget:number;

    @IsNotEmpty()
    @IsNumber()
    owner:number;
}