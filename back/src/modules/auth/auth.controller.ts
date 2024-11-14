import { Body, Controller, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './Dto/auth.dto';
import { UserService } from '../user/user.service';
import { ResetPasswordDto } from './Dto/auth.reset.dto';
import { MailService } from './mailservice/mailservice.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService,
        private readonly userservice:UserService,
        private readonly mailservice:MailService,
    ){}

    @Post('login')
    
    async login(@Body() loginDto:AuthDto){
        const user = await this.authservice.validateUser(loginDto.email,loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
          }
          return this.authservice.login(user); 
        }
    @Post('forgot-password')
    async forgotPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;
    
    const user = await this.userservice.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Générer un token de réinitialisation
    const resetToken = this.authservice.generateResetToken(user);
    
    // Envoyer un e-mail avec le lien de réinitialisation
    const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
    await this.mailservice.sendResetPasswordEmail(user.email, resetLink);
    
    return { message: 'Check your email for the reset password link' };
  }
  @Post('reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
    // Vérifier le token
    const userId = await this.authservice.verifyResetToken(token);
    
    if (!userId) {
      throw new Error('Invalid or expired token');
    }

    // Mettre à jour le mot de passe de l'utilisateur
    await this.userservice.updatePassword(userId, resetPasswordDto.password);
    return { message: 'Password has been reset successfully' };
  }
}

