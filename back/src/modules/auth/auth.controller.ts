import { MailService } from './mailService/mail.service';
import { Body, Controller,Get,HttpException,HttpStatus,Logger,Post, Query } from '@nestjs/common';
import { AddUserDTO } from './dtos/add-user.dto';
import { User } from 'src/modules/user/user.entity';
import { AuthService } from './auth.service';


type Response={
    message:string;
    user?:User;
    errorMessage?:string;
} 

@Controller('auth')
export class AuthController {
    constructor(
        private readonly signupService: AuthService,
        private readonly mailService: MailService,
    ) {}

    @Post("/register")
    async registerUser(@Body() addUserDTO: AddUserDTO): Promise<Response> {
        try { 
            const user = await this.signupService.addUser(addUserDTO);
            await this.mailService.sendVerificationMail(user.id); //this shouldnt be here because its slowing down the registration cron job maybe?
                        
            return {
                message:"User registered successfully",
                user:user
            };
        } catch (err) {

            console.error('Error during user registration:', err);
            throw new HttpException(
                {
                message:"Error while adding user",
                errorMessage:err.message || "Unknown error",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    @Get("/confirm")
    async confirmUser(@Query("token") token: string, @Query("id") userId:number): Promise<Response> {
        try {
            if (await this.mailService.verifyUserEmail(userId,token))
            {
                return {
                    message:"User email confirmed successfully",
                }
            }
        } catch (err) {
            console.error("Error while confirming user email",err)
            throw new HttpException(
                {
                message:"Error while verifying user email",
                errorMessage:err.message || "Unknown error",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}
