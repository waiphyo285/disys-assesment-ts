import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlsModule } from './short_urls/short_urls.module';

@Module({
  imports: [ShortUrlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
