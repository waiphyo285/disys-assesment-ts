import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlsModule } from './short_urls/short_urls.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'disys_assesment_ts',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ShortUrlsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
