import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ShortUrlsModule } from './../src/short_urls/short_urls.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/short-urls (GET)', () => {
    return request(app.getHttpServer()).get('/short-urls').expect(200);
  });

  it('/short-urls/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/short-urls/ZCvrpEqbYX')
      .expect(302);
  });

  it('/short-urls/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/short-urls/WmTE71egMY')
      .expect(401);
  });

  it('/short-urls/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/short-urls/WmTE71egMM')
      .expect(404);
  });

  it('/short-urls (POST)', () => {
    const mockObj = {
      fullUrl: 'https://hello.io/world',
    };
    return request(app.getHttpServer())
      .post('/short-urls')
      .send(mockObj)
      .expect(201);
  });

  it('/short-urls (PUT)', () => {
    const mockObj = {
      id: 35,
      hitCount: 10,
    };
    return request(app.getHttpServer())
      .put('/short-urls')
      .send(mockObj)
      .expect(200);
  });

  it('/short-urls (DELETE)', () => {
    return request(app.getHttpServer()).delete('/short-urls/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
