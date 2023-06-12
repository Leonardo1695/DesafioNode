import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFinancialPost } from '../interfaces';
import { FinancialPostType } from '../enum';

@Entity('financial-posts')
export default class FinancialPost implements IFinancialPost {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column('int', { name: 'amount', nullable: true })
  amount: number;

  @Column('varchar', { name: 'type', length: 10 })
  type: FinancialPostType;

  @Column('varchar', { name: 'user_id', length: 50 })
  userId: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date | null;
}
