import { Module } from '@nestjs/common';
import { FactoriesModule } from './factories/factories.module';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: "abudev99",
      database: String(process.env.DB_NAME),
      autoLoadEntities:true,
      synchronize:true
    }),
    FactoriesModule,
    EmployeeModule,
  ],
})
export class AppModule {}
