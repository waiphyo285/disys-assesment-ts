import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from './short_url.entity';
import { ShortUrlDto } from './dto/short-url.dto';
import { EXPIRED } from 'src/helplers/constant';
import { generateCode } from 'src/helplers';

@Injectable()
export class ShortUrlsService {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private shortUrlRepository: Repository<ShortUrlEntity>,
  ) {}

  async getList(): Promise<ShortUrlEntity[]> {
    return await this.shortUrlRepository.find();
  }

  async getDataByCode(code: string): Promise<ShortUrlEntity | any> {
    const result = await this.shortUrlRepository.findOne({
      select: ['id', 'fullUrl', 'hitCount', 'isExpired', 'expiredAt'],
      where: [{ shortCode: code }],
    });

    if (result && result.isExpired) {
      return moment(result.expiredAt).isAfter(new Date()) ? result : EXPIRED;
    }

    return result;
  }

  async createData(data: ShortUrlDto) {
    data.shortCode = generateCode(10);

    if (data.expiredAt) data.isExpired = true;

    return this.shortUrlRepository.save(data);
  }

  async updateData(data: ShortUrlDto) {
    return this.shortUrlRepository.save(data);
  }

  async deleteData(data: ShortUrlDto) {
    return this.shortUrlRepository.delete(data);
  }
}
