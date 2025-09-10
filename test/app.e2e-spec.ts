import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }); 
  it('should return 200 on GET /factories', () => {
    return request(app.getHttpServer())
      .get('/factories') // sizda mavjud endpoint bo‘lishi kerak
      .expect(200);
  });
  afterAll(async () => {
    await app.close();
  });
});
