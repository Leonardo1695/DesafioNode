import { FinancialPostType } from '../enum';

export interface IFinancialPostCreate {
  description: string;
  amount: number;
  type: FinancialPostType;
}
