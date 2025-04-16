// src/urls/dto/delete-url-response.output.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteUrlResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
