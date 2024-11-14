import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configservice:ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: this.configservice.get<string>('EMAIL'),///addresse mail bch tab3eth
        pass: this.configservice.get<string>('MOT_DE_PASSE_EMAIL'),///mot de passe mte3ha
      },
    });
  }

  async sendResetPasswordEmail(email: string, resetLink: string) {
    const mailOptions = {
      from: this.configservice.get<string>('EMAIL'),
      to: email,
      subject: 'Reset your password',
      text: `Click on the following link to reset your password: ${resetLink}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
