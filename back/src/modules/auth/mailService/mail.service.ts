import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { generateToken, verifyToken } from 'src/helper/email.helpers';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transporter:nodemailer.Transporter;

    constructor(
        private configService:ConfigService, private readonly userService: UserService) {
        this.transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
            user: this.configService.get<string>('EMAIL_ADDRESS'),
            pass: this.configService.get<string>('EMAIL_PASSWORD'),
          },
        });
      }

    async sendVerificationMail(userId:number){
        const user:User= await this.userService.findUserById(userId)
        if (user.verifiedAt){
            throw new NotFoundException(`User with id ${userId} is already verified`);
        }
        const email:string=user.email;
        const token=generateToken(userId)
        const subject="VoyaMate Email Verification";
        const baseUrl= this.configService.get<string>("FRONTEND_URL");
        const confirmationLink = `http://${baseUrl}/auth/confirm?id=${userId}&token=${token}`;
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Confirmation</title>
        </head>
        <body>
            <h2>Confirm Your Account</h2>
            <p>To confirm your account, please click the link below:</p>
            <p><a href="${confirmationLink}" target="_blank" style="color: blue; text-decoration: underline;">Click here to confirm your account</a></p>
            <p>If you did not request this, please ignore this email.</p>
        </body>
        </html>
    `;
        try{
            await this.transporter.sendMail({
                from:process.env.MAIL_USER,
                to:email,
                subject,
                html:htmlContent
            });
        }catch(err){
            console.error("Error sending mail",err);
        }
    }

    async verifyUserEmail(userId:number,token:string){
        const user= await this.userService.findUserById(userId)
       if (!verifyToken(userId,token)){
            throw new Error("Invalid or expired token")
       }
        user.verifiedAt=new Date();
        await this.userService.updateUser(user);
        return true;
    }

    async sendResetPasswordEmail(email: string, resetLink: string) {
        const mailOptions = {
          from: this.configService.get<string>('EMAIL'),
          to: email,
          subject: 'Reset your password',
          text: `Click on the following link to reset your password: ${resetLink}`,
        };
    
        await this.transporter.sendMail(mailOptions);
      }

}
