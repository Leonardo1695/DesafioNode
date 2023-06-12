import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IRevenue } from '../interfaces/revenue.interface';
import { IFinancialPost } from '../interfaces';

export class RevenueDTO implements IRevenue {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  financialPosts: IFinancialPost[];

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  totalElements: number;
}
