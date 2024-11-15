import { ConfigService } from '@nestjs/config';
import { Body, Controller,Get,HttpException,HttpStatus,Param,Post, Query, UnauthorizedException } from '@nestjs/common';
import { MailService } from './mailService/mail.service';
import { AddUserDTO } from './dtos/add-user.dto';
import { AuthDto } from './dtos/auth.dto';
import { User } from 'src/modules/user/user.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ResetPasswordDto } from './dtos/auth.reset.dto';


type Response={
    message:string;
    user?:User;
    errorMessage?:string;
} 

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly signupService: AuthService,
        private readonly mailService: MailService,
        private readonly authservice:AuthService,
        private readonly configService:ConfigService,

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

    @Post('login')
        
    async login(@Body() loginDto:AuthDto):Promise<{ access_token: string }>{
        const user = await this.authservice.validateUser(loginDto.email,loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authservice.login(user); 
        }
    @Post('forgot-password')
    async forgotPassword(@Body() resetPasswordDto: ResetPasswordDto):Promise<{message:string}> {
    const { email } = resetPasswordDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
    throw new Error('User not found');
    }

    // Générer un token de réinitialisation
    const resetToken = this.authservice.generateResetToken(user);

    // Envoyer un e-mail avec le lien de réinitialisation
    // const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`; 
     const resetLink=this.configService.get("FRONTEND_URL")+"/auth/reset-password/"+resetToken;

    await this.mailService.sendResetPasswordEmail(user.email, resetLink);

    return { message: 'Check your email for the reset password link' };
    }


    @Post('reset-password/:token')
    async resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto):Promise<{message:string}> {
    // Vérifier le token
    const userId = await this.authservice.verifyResetToken(token);

    if (!userId) {
    throw new Error('Invalid or expired token');
    }

    // Mettre à jour le mot de passe de l'utilisateur
    await this.userService.updatePassword(userId, resetPasswordDto.password);
    return { message: 'Password has been reset successfully' };
    }

}
