import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { Publication, PublicationShema } from './entities/publication.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, AuthGuard],
  imports: [
    ConfigModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Publication.name, 
        schema: PublicationShema
      }
    ])
  ],
  exports: [ MongooseModule, PublicationsService ]
})
export class PublicationsModule {}
