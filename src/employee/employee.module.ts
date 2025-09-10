import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { FactoriesModule } from '../factories/factories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Employee,FactoriesModule])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
