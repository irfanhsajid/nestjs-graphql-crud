/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlInput } from './dto/create-url.input';
import { Url as UrlModel } from './models/url.model';
import { Url } from './schemas/url.schema';
import { generateHashFromUrl } from 'src/utils/shortener.util';
import { UpdateUrlInput } from './dto/update-url.input';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}
  // insert new url
  async create(createUrlInput: CreateUrlInput): Promise<UrlModel> {
    const { originalUrl, customShortCode } = createUrlInput;

    const shortCode = customShortCode || generateHashFromUrl(originalUrl, 6);

    const existingUrl = await this.urlModel.findOne({ shortCode });
    if (existingUrl) {
      throw new BadRequestException('Short code already in use');
    }

    const url = new this.urlModel({
      originalUrl,
      shortCode,
      clicks: 0,
    });

    const savedUrl = await url.save();

    return {
      id: savedUrl.id,
      originalUrl: savedUrl.originalUrl,
      shortCode: savedUrl.shortCode,
      clicks: savedUrl.clicks,
      createdAt: savedUrl.createdAt,
    };
  }

  //find all the urls
  async findAll(): Promise<UrlModel[]> {
    const urls = await this.urlModel.find().exec();
    return urls.map((url) => ({
      id: url.id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
    }));
  }

  // find the original url and details by short code
  async findByShortCode(shortCode: string): Promise<UrlModel> {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) {
      throw new BadRequestException('Short code not found');
    }
    return {
      id: url.id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
    };
  }

  // how many times it is being clicked and redirected
  async incrementClicks(shortCode: string): Promise<UrlModel> {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) {
      throw new BadRequestException('Short code not found');
    }
    url.clicks += 1;
    const updatedUrl = await url.save();
    return {
      id: updatedUrl.id,
      originalUrl: updatedUrl.originalUrl,
      shortCode: updatedUrl.shortCode,
      clicks: updatedUrl.clicks,
      createdAt: updatedUrl.createdAt,
    };
  }

  //update a url details by extracting shortcode
  async updateUrl(input: UpdateUrlInput): Promise<UrlModel> {
    const { shortCode, originalUrl, newShortCode } = input;

    const url = await this.urlModel.findOne({ shortCode });
    if (!url) {
      throw new BadRequestException('Short code not found');
    }

    if (originalUrl) {
      url.originalUrl = originalUrl;
    }

    if (newShortCode) {
      const existing = await this.urlModel.findOne({ shortCode: newShortCode });
      if (existing) {
        throw new BadRequestException('New short code already in use');
      }
      url.shortCode = newShortCode;
    }

    const updated = await url.save();

    return {
      id: updated.id,
      originalUrl: updated.originalUrl,
      shortCode: updated.shortCode,
      clicks: updated.clicks,
      createdAt: updated.createdAt,
    };
  }

  //delete a url details by ID
  async deleteById(id: string): Promise<{ success: boolean; message: string }> {
    const result = await this.urlModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      return {
        success: true,
        message: 'URL deleted successfully',
      };
    } else {
      throw new BadRequestException('URL not found');
    }
  }
}
