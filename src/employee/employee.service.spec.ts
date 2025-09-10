import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repo: jest.Mocked<Repository<Employee>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(EmployeeService);
    repo = module.get(getRepositoryToken(Employee));
  });
 
  it('should create an employee', async () => {
    const dto = { fullName: 'John Doe', position: 'Engineer' };
    repo.create.mockReturnValue(dto as Employee);
    repo.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all employees', async () => {
    repo.find.mockResolvedValue([
      { id: 1, fullName: 'John Doe', position: 'Engineer' },
    ]);
    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });
});
