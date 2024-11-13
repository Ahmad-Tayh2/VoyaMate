import { IsString, IsEmail, Length,IsNotEmpty,MinLength } from 'class-validator';



export class AddUserDTO {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
    
    @IsString()
    phone: string;

}