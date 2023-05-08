import { Module } from '@nestjs/common';
import { ShortUrlsService } from './short_urls.service';
import { ShortUrlsController } from './short_urls.controller';

@Module({
  providers: [ShortUrlsService],
  controllers: [ShortUrlsController]
})
export class ShortUrlsModule {}
