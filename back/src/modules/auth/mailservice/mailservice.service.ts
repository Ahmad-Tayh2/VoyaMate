import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'my_email@gmail.com',///addresse mail bch tab3eth
        pass: 'my_email_password',///mot de passe mte3ha
      },
    });
  }

  async sendResetPasswordEmail(email: string, resetLink: string) {
    const mailOptions = {
      from: 'my_email@gmail.com',
      to: email,
      subject: 'Reset your password',
      text: `Click on the following link to reset your password: ${resetLink}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
