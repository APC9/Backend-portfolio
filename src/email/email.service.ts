import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {


  private readonly logger = new Logger('ProjectsService');

  constructor(
    private readonly mailerService: MailerService, 
    private configService: ConfigService
  ){}

  create(createEmailDto: CreateEmailDto) {
    const { name, lastName, email, text } = createEmailDto;

    try {   
      this.mailerService.sendMail({
        to: this.configService.get<string>('MAILER_TO'),
        from: email,
        subject: 'Correo de Contacto de Portafolio',
        html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Correo de Contacto</title>
        </head>
        <body>
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center" bgcolor="#f2f2f2">
                        <table width="600" cellspacing="0" cellpadding="20">
                            <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 40px;">
                                    <h2>Contacto</h2>
                                    <p><strong>Nombre:</strong>${name}- ${lastName}</p>
                                    <p><strong>Correo Electrónico:</strong> ${email}</p>
                                    <p><strong>Mensaje:</strong></p>
                                    <p>${text}</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        
        `
      })

      return { ok: true, message: 'email sent successfully'}
    } catch (error) {
      this.handleExceptionsErrors(error)
    }
  }

  handleExceptionsErrors(error:any) {

    if( !error.message ){
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpeced error, check server logs'); 
    }

    throw new BadRequestException(error.message);
  }
}
