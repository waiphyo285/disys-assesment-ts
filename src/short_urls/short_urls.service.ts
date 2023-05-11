import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Cache, memoryStore } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from './short_url.entity';
import { ShortUrlDto } from './dto/short-url.dto';

import { generateCode } from '../helpers/index';
import { EXPIRED } from '../helpers/constant';

@Injectable()
export class ShortUrlsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(ShortUrlEntity)
    private shortUrlRepository: Repository<ShortUrlEntity>,
  ) {}

  async getList(): Promise<ShortUrlEntity[]> {
    return await this.shortUrlRepository.find();
  }

  async getDataByCode(code: string): Promise<ShortUrlEntity | any> {
    let result: any;

    const checkResult = async (data: any, isCache) => {
      if (!isCache) await this.cacheManager.set(code, data);

      if (data && data.isExpired)
        return moment(data.expiredAt).isAfter(new Date()) ? data : EXPIRED;

      return data;
    };

    result = await this.cacheManager.get(code);

    if (result) return checkResult(result, true);

    result = await this.shortUrlRepository.findOne({
      select: ['id', 'fullUrl', 'hitCount', 'isExpired', 'expiredAt'],
      where: [{ shortCode: code }],
    });

    return checkResult(result, false);
  }

  async createData(data: ShortUrlDto) {
    data.shortCode = generateCode(10);

    if (data.expiredAt) data.isExpired = true;

    return this.shortUrlRepository.save(data);
  }

  async updateData(data: ShortUrlDto) {
    return this.shortUrlRepository.save(data);
  }

  async deleteData(id: number) {
    return this.shortUrlRepository.delete(id);
  }
}
