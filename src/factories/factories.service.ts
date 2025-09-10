import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FactoriesService {
  constructor(@InjectRepository(Factory) private repo: Repository<Factory>) {}
  create(createFactoryDto: CreateFactoryDto) {
    return this.repo.save(this.repo.create(createFactoryDto));
  }

  findAll() {
   return this.repo.find({ relations: ['employees'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['employees'] });
  }

  async update(id: number, updateFactoryDto: UpdateFactoryDto) {
    await this.repo.update(id, updateFactoryDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
