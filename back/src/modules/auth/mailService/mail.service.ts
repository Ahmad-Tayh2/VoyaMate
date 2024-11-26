import { Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendMailObject } from 'src/shared/interfaces/email.interface';

@Injectable()
export class MailService {
    private transporter:nodemailer.Transporter;

    constructor(
        private configService:ConfigService) {
        this.transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
            user: this.configService.get<string>('EMAIL_ADDRESS'),
            pass: this.configService.get<string>('EMAIL_PASSWORD'),
          },
        });
      }

    async sendConfirmationMail(sendmailObject:SendMailObject,token:string){

        let subject:string;
        let content:string;
        const email=sendmailObject.to;
        const baseUrl= this.configService.get<string>("FRONTEND_URL");
        let confirmationLink="";
    
        switch(sendmailObject.type){
            case "account":{
                subject="VoyaMate Email Verification";
                content="To confirm your account, please click the link below:\n";
                //this can be changed depending on the front
                confirmationLink +=`${baseUrl}/auth/confirm?token=${token}`;
                break;

            }
            case "member":{
                subject="VoyaMate Member Request";
                content="You have been invited to join a trip. Click the link below to accept the invitation:\n";
                //this can be changed depending on the front
                confirmationLink += `${baseUrl}/itinerary/member/confirm?token=${token}`;
                break;

            }
        }
        try{
            await this.transporter.sendMail({
                from:process.env.MAIL_USER,
                to:email,
                subject,
                text:content+confirmationLink
            });
        }catch(err){
            console.error("Error sending mail",err);

        }
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