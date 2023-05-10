import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthModule } from './../src/auth/auth.module';
import { ShortUrlsModule } from './../src/short_urls/short_urls.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let auth: any;
  let token: string;

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
        AuthModule,
        ShortUrlsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    auth = await request(app.getHttpServer()).post('/auth/login').send({
      username: 'hellojwt',
      password: 'worldjwt', // plaintext are just sample usecase
    });

    token = 'Bearer ' + auth._body.access_token;
  });

  it('/short-urls (GET)', () => {
    console.log('Auth', auth._body.access_token);
    return request(app.getHttpServer())
      .get('/short-urls')
      .set('Authorization', token)
      .expect(200);
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
      .set('Authorization', token)
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
      .set('Authorization', token)
      .expect(200);
  });

  it('/short-urls (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/short-urls/1')
      .set('Authorization', token)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
