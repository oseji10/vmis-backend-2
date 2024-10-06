import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';  // Import the EmailService

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('request')
  async requestDrug(@Body('email') email: string, @Body('drugName') drugName: string) {
    // Your logic to handle drug request
    // ...

    // Send email notification
    await this.emailService.sendDrugRequestNotification(email, drugName);

    return { message: 'Drug request made and notification sent!' };
  }
}
