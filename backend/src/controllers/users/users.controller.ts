import { Body, Controller, Logger, Post } from '@nestjs/common';

import { IP } from '../../common/decorators/ip.decorator';
import { CreateContactUsDto } from '../../models/dto/admin/users/create-contact-us.dto';

@Controller('users')
export class UsersController {
  /**
   * @description inject all related and needed services to work with.
   * @param emailService
   * @param recaptchaService
   */
  constructor() {}

  @Post('contactUs')
  async createContactUs(
    @Body() dto: CreateContactUsDto,
    @IP() ip: string,
  ): Promise<void> {
    /** change the email from dto to lower case (easy to work with) */
    const incomingEmail = dto.email
      .split(' ')
      .join('')
      .trim()
      .toLocaleLowerCase();

    try {
    } catch (error) {
      Logger.error(
        error,
        `${UsersController.name}/${this.createContactUs.name}`,
        'sending contact us email failed',
      );
      throw error;
    }
  }
}
