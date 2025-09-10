import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepo.save(this.employeeRepo.create(createEmployeeDto));
  }

  findAll() {
    return this.employeeRepo.find({ relations: ['factory'] });
  }

  async findOne(id: number) {
    const employe = await this.employeeRepo.findOne({
      where: { id },
      relations: ['factory'],
    });
    return employe;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepo.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.employeeRepo.delete(id)
  }
}
