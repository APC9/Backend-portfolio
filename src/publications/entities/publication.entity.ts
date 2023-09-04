import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Publication extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: false })
  content: string;

}

export const PublicationShema = SchemaFactory.createForClass(Publication);


