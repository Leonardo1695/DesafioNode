import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { FinancialPostType } from '../enum';
import { IFinancialPost } from '../interfaces';

export class FinancialPostDTO implements IFinancialPost {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(FinancialPostType)
  type: FinancialPostType;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
