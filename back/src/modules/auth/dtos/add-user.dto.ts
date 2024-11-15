import { IsString, IsEmail, IsNotEmpty,MinLength,Matches } from 'class-validator';

export class AddUserDTO {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      })
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}