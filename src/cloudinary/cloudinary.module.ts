import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  imports:[
    AuthModule,
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: '../../static/uploads',
    }),
  ],
  exports: [CloudinaryService ]
})
export class CloudinaryModule {}
