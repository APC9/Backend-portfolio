import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Project extends Document{
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  img?: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string; 

  @Prop({ required: true, type: [String] })
  technologies: string[];

}


export const ProjectSchema = SchemaFactory.createForClass(Project);
