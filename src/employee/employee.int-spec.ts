import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { NotFoundException } from '@nestjs/common';

describe('EmployeeService (Integration)', () => {
  let service: EmployeeService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Employee],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Employee]),
      ],
      providers: [EmployeeService],
    }).compile();

    service = module.get(EmployeeService);
  });

  it('should create and get an employee', async () => {
    const employee = await service.create({
      fullName: 'Jane Doe',
      position: 'Manager',
    });
    expect(employee.id).toBeDefined();

    const found = await service.findOne(employee.id);
    if(!found){
        throw new NotFoundException('Not found')
    }
    expect(found.fullName).toBe('Jane Doe');
  });
});
