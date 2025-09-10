import { Factory } from '../../factories/entities/factory.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  position: string;

  @ManyToOne(() => Factory, (factory) => factory.employees)
  factory?: Factory;
}
