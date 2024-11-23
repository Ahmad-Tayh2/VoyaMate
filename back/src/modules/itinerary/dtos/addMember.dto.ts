import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class addMemberDto{
    @IsNumber()
    memberId:string;

    @IsNotEmpty()
    @IsString()
    memberEmail:string;
}