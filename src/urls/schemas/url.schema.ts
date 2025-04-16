import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Url extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  clicks: number;

  // Explicitly define fields added by timestamps
  createdAt: Date;
  updatedAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);

// Ensure Mongoose provides a virtual 'id' field as a string
UrlSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId }
) {
  return this._id.toHexString();
});

// Ensure the virtual 'id' is included in toJSON and toObject outputs
UrlSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

UrlSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});
