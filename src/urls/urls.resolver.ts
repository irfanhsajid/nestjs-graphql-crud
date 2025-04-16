import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUrlInput } from './dto/create-url.input';
import { Url } from './models/url.model';
import { UrlsService } from './urls.service';
import { UpdateUrlInput } from './dto/update-url.input';
import { DeleteUrlResponse } from './dto/delete-url-response.output';

@Resolver(() => Url)
export class UrlsResolver {
  constructor(private readonly urlsService: UrlsService) {}

  @Mutation(() => Url)
  async createUrl(@Args('input') input: CreateUrlInput): Promise<Url> {
    return this.urlsService.create(input);
  }

  @Query(() => [Url])
  async getAllUrls(): Promise<Url[]> {
    return this.urlsService.findAll();
  }

  @Query(() => Url)
  async getUrl(@Args('shortCode') shortCode: string): Promise<Url> {
    return this.urlsService.findByShortCode(shortCode);
  }

  @Mutation(() => Url)
  async redirectUrlByClick(@Args('shortCode') shortCode: string): Promise<Url> {
    return this.urlsService.incrementClicks(shortCode);
  }

  @Mutation(() => Url)
  async updateUrlDetails(@Args('input') input: UpdateUrlInput): Promise<Url> {
    return this.urlsService.updateUrl(input);
  }

  @Mutation(() => DeleteUrlResponse)
  async deleteUrl(@Args('id') id: string): Promise<DeleteUrlResponse> {
    return this.urlsService.deleteById(id);
  }
}
