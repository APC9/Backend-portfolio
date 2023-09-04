import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from './entities/project.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    AuthModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema
      }
    ])
  ],
  exports:[ MongooseModule, ProjectsService ]
})
export class ProjectsModule {}
