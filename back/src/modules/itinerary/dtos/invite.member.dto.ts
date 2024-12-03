import { IsNotEmpty, IsNumber} from "class-validator";


export class inviteMemberDto{

    @IsNotEmpty()
    @IsNumber()
    itineraryId: string;

    @IsNumber()
    memberId:number;
}