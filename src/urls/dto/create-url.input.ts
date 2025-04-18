import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUrl, Length } from 'class-validator';

@InputType()
export class CreateUrlInput {
  @Field()
  @IsUrl({}, { message: 'Must be a valid URL' })
  originalUrl: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 10, { message: 'Short code must be between 3 and 10 characters' })
  customShortCode?: string;
}
