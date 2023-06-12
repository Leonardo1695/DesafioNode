import { FinancialPostType } from '../enum';

export interface IFinancialPost {
  id: string;
  description: string;
  amount: number;
  type: FinancialPostType;
  userId: string;
  createdAt: Date;
}
