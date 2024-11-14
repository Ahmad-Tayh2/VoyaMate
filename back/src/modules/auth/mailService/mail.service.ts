import { Injectable, NotFoundException } from '@nestjs/common';
import { createHmac } from 'crypto';
import * as nodemailer from 'nodemailer';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class MailService {
    private transporter:nodemailer.Transporter;

    constructor(
        private readonly userService: UserService

    ){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
    }
    async sendVerificationMail(userId:number){
        const user:User= await this.userService.findUserById(userId)
        if (user.verifiedAt){
            throw new NotFoundException(`User with id ${userId} is already verified`);
        }
        const email:string=user.email;
        const token=this.generateToken(userId)
        const subject="VoyaMate Email Verification";
        const baseUrl=process.env.BASE_URL || "localhost:3000";
        const confirmationLink = `http://${baseUrl}/signup/confirm?id=${userId}&token=${token}`;
        console.log(confirmationLink)

        try{
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
            await this.transporter.sendMail({
                from:process.env.MAIL_USER,
                to:email,
                subject,
                html:htmlContent
            });
        }catch(err){
            console.log("Error sending mail",err);
        }
    }


    async verifyUserEmail(userId:number,token:string){
        const secret_key=process.env.EMAIL_VERIFICATION_SECRET_KEY

        const user= await this.userService.findUserById(userId)
        if (user.verifiedAt){
            throw new NotFoundException(`User with id ${userId} is already verified`);
        }
        const tokenParts=token.split('.')
        if (tokenParts.length !== 2) {
            throw new Error("Invalid token format");
        }
        const [hash, expirationTime] = tokenParts
        const currentTime = Date.now();
        if (currentTime > parseInt(expirationTime)){
            throw new Error("Token expired");
        }
        const expectedHash = createHmac('sha256', secret_key) 
        .update(userId + expirationTime.toString()) 
        .digest('hex');
        if (expectedHash !== hash){
            throw new Error("Invalid token");
        }
        user.verifiedAt=new Date();
        await this.userService.updateUser(user);
        return true;
    }

    private generateToken(userId:number,expiresInMinutes:number=10):string{
        const expirationTime = Date.now() + expiresInMinutes * 60 * 1000; 
        const secret_key=process.env.EMAIL_VERIFICATION_SECRET_KEY
        const hash = createHmac('sha256', secret_key) 
        .update(userId+ expirationTime.toString()) 
        .digest('hex');
        return `${hash}.${expirationTime}`
    }
}
