import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfiguration } from './config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { EmailModule } from './email/email.module';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { PublicationsModule } from './publications/publications.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    //Configuracion de Variables de entorno
    ConfigModule.forRoot({
      load: [envConfiguration],
    }),
    //configuracion de Mongoose
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProjectsModule,
    CloudinaryModule,
    EmailModule,
    AuthModule,
    PublicationsModule,

    //Envio de emails 
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure:true,
        auth: {
          user: process.env.MAILER_TO,
          pass: process.env.MAILER_PASSWORD
        }
      }
    }),


  ],
  controllers: [ EmailController ],
  providers: [ CloudinaryService, EmailService ],
})
export class AppModule {}
