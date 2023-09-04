import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  exports: [ EmailService ],
  imports:[ ConfigModule.forRoot()]
})
export class EmailModule {}
