/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlInput } from './dto/create-url.input';
import { Url as UrlModel } from './models/url.model';
import { Url } from './schemas/url.schema';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async create(createUrlInput: CreateUrlInput): Promise<UrlModel> {
    const { originalUrl, customShortCode } = createUrlInput;

    const shortCode = customShortCode || this.generateShortCode(6);

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

  private generateShortCode(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
