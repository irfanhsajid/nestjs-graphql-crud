// src/urls/dto/update-url.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUrl, Length } from 'class-validator';

@InputType()
export class UpdateUrlInput {
  @Field()
  shortCode: string; // used to identify the record

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Must be a valid URL' })
  originalUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 10, { message: 'Short code must be between 3 and 10 characters' })
  newShortCode?: string;
}
