import { IsOptional, IsString } from 'class-validator';
import { IRevenueFilter } from '../interfaces/revenue-filter.interface';

export class RevenueFilterDTO implements IRevenueFilter {
  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  itemsPerPage: string;
}
