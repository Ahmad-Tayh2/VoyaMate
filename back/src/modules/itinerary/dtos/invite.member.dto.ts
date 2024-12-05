import { IsNotEmpty, IsNumber} from "class-validator";


export class inviteMemberDto{

    @IsNotEmpty()
    @IsNumber()
    itineraryId: number;

    @IsNotEmpty()
    @IsNumber()
    memberId:number;
}