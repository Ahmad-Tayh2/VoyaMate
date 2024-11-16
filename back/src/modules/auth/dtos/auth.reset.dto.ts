import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ResetPasswordDto  {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;
}