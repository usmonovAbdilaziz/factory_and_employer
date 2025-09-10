import { Test } from '@nestjs/testing';
import { FactoriesService } from './factories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';


describe('FactoriesService', () => {
  let service: FactoriesService;
  let repo: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FactoriesService,
        {
          provide: getRepositoryToken(Factory),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(FactoriesService);
    repo = module.get(getRepositoryToken(Factory));
  });

  it('should create a factory', async () => {
    const dto = { name: 'Test Factory', location: 'Tashkent' };
    repo.create.mockReturnValue(dto);
    repo.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });
});
