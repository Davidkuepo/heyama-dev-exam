import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ObjectDocument = HydratedDocument<HeyamaObject>;

@Schema({ timestamps: true })
export class HeyamaObject {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageData: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ObjectSchema = SchemaFactory.createForClass(HeyamaObject);
