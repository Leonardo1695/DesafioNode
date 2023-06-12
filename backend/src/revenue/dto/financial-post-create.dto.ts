import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FinancialPostType } from '../enum';
import { IFinancialPostCreate } from '../interfaces/financial-post-create.interface';

export class FinancialPostCreateDTO implements IFinancialPostCreate {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(FinancialPostType)
  type: FinancialPostType;
}
