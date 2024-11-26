import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class addMemberDto{
    @IsNumber()
    memberId:number;

    @IsNotEmpty()
    @IsString()
    memberEmail:string;
}