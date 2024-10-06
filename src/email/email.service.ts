import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,  // Replace with your SMTP server
      port: process.env.MAIL_PORT,  // Usually 587 for TLS or 465 for SSL
      secure: false,  // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // Your email
        pass: process.env.MAIL_PASSWORD,  // Your email password or app password
      },
    });
  }

  async sendDrugRequestNotification(email: string, drugName: string): Promise<void> {
    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: `${email}`,
      subject: `New Drug Request from`,
      text: `A request has been made for the drug: ${drugName}`,
      html: `<p>A request has been made for the drug: <strong>${drugName}</strong></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
