import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';
import { FactoriesService } from './factories.service';
import { NotFoundException } from '@nestjs/common';
import { FactoriesController } from './factories.controller';
import { Employee } from 'src/employee/entities/employee.entity';

describe('FactoriesService Integration', () => {
  let service: FactoriesService;

  // factories.controller.spec.ts
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost', // yoki docker compose ishlatsa: 'postgres'
          port: 5432,
          username: 'postgres',
          password: 'abudev99',
          database: 'factory', // test uchun alohida DB
          autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Factory, Employee]),
      ],
      controllers: [FactoriesController],
      providers: [FactoriesService],
    }).compile();

    service = module.get<FactoriesService>(FactoriesService);
  });

  it('should create and fetch factory', async () => {
    const factory = await service.create({ name: 'UzAuto', location: 'Asaka' });
    expect(factory.id).toBeDefined();

    const found = await service.findOne(factory.id);
    if (!found) {
      throw new NotFoundException('Not found');
    }
    expect(found.name).toBe('UzAuto');
  });
});
