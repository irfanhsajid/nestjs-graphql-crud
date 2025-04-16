import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUrlInput } from './dto/create-url.input';
import { Url } from './models/url.model';
import { UrlsService } from './urls.service';

@Resolver(() => Url)
export class UrlsResolver {
  constructor(private readonly urlsService: UrlsService) {}

  @Mutation(() => Url)
  async createUrl(@Args('input') input: CreateUrlInput): Promise<Url> {
    return this.urlsService.create(input);
  }

  @Query(() => Url)
  async getUrl(@Args('shortCode') shortCode: string): Promise<Url> {
    return this.urlsService.findByShortCode(shortCode);
  }

  @Mutation(() => Url)
  async redirectUrl(@Args('shortCode') shortCode: string): Promise<Url> {
    return this.urlsService.incrementClicks(shortCode);
  }
}
