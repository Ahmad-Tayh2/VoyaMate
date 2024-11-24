import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ForgotPasswordDto {
    @IsEmail()
    email: string;
}

export class ResetPasswordDto  {
    @IsString()
    password: string;
}