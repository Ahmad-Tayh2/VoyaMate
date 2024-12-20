import { ConfigService } from '@nestjs/config';
import { Body, Controller,Get,HttpException,HttpStatus,Param,Post, Query, UnauthorizedException, UseGuards,Request } from '@nestjs/common';
import { MailService } from './mailService/mail.service';
import { AddUserDTO } from './dtos/add-user.dto';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dtos/auth.reset.dto';
import { AccountConfirmationMail } from 'src/shared/interfaces/email.interface';
import { ApiResponse } from 'src/shared/interfaces/response.interface';
import { JwtAuthGuard } from '../auth/GUARD/auth.guard'



@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly signupService: AuthService,
        private readonly mailService: MailService,
        private readonly authservice:AuthService,
        private readonly configService:ConfigService,

    ) {}


    //register + sending verification email
    @Post("/register")
    async registerUser(@Body() AddUserDTO: AddUserDTO): Promise<ApiResponse<null>> {
        try { 
            const user = await this.signupService.addUser(AddUserDTO);
            const sendMailObject: AccountConfirmationMail = {
                type: "account",
                to: user.email,
            }
            const token = this.authservice.generateToken({
                userId:user.id
            },"1h");
            await this.mailService.sendConfirmationMail(sendMailObject,token);          
            return {
                success: true,
                message:"Verification Email sent successfully!",
            };

        } catch (err) {
            throw new HttpException(
                {
                message:"Error while adding user",
                errorMessage:err.message || "Unknown error",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    


    //for testing purposes
    @UseGuards(JwtAuthGuard)

    @Get("/verify-email")
    async verifyEmail(@Request() req): Promise<ApiResponse<null>>{
        const sendMailObject: AccountConfirmationMail = {
            type: "account",
            to: req.user.email,
        }
        const token = this.authservice.generateToken({
            userId:req.user.id
        },"1h");
        await this.mailService.sendConfirmationMail(sendMailObject,token);          
        return {
            success: true,
            message:"Verification Email sent successfully!",
        };
    }

    //the front end will call this endpoint to confirm the email
    @Get("/confirm-email")
    async confirmUser(@Query("token") token: string): Promise<ApiResponse<null>> {
        try {
            await this.authservice.verifyUserEmail(token)
            {
                return {
                    success:true,
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
    @Post('recover-password')
    async forgotPassword(@Body() resetPasswordDto: ForgotPasswordDto):Promise<{message:string}> {
    const { email } = resetPasswordDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
    throw new Error('User not found');
    }

    // Générer un token de réinitialisation
    const resetToken = this.authservice.generateResetToken(user);

    // Envoyer un e-mail avec le lien de réinitialisation
    const resetLink=this.configService.get("FRONTEND_URL")+"/auth/recover-password/"+resetToken;
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
