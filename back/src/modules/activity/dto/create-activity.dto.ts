import { IsEmpty, IsString, IsUrl } from "class-validator";

export class CreateActivityDto {

    @IsString()
    name:string;
    @IsString()

    description:string
    @IsString()
    checkpointId: number;

}
