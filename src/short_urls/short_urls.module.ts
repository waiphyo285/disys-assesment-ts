import { Module } from '@nestjs/common';
import { ShortUrlsService } from './short_urls.service';
import { ShortUrlsController } from './short_urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from './short_url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  providers: [ShortUrlsService],
  controllers: [ShortUrlsController],
})
export class ShortUrlsModule {}
