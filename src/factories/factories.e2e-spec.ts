import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('EmployeesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/employees (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/employees')
      .send({ fullName: 'Alice', position: 'Developer' })
      .expect(201);

    expect(res.body.fullName).toBe('Alice');
  });

  it('/employees (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/employees')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
