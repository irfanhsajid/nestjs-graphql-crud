import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Url {
  @Field()
  id: string;

  @Field()
  originalUrl: string;

  @Field()
  shortCode: string;

  @Field(() => Int)
  clicks: number;

  @Field()
  createdAt: Date;
}
