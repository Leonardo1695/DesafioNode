import { IFinancialPost } from './financial-post.interface';

export interface IRevenue {
  startDate: string;
  endDate: string;
  financialPosts: IFinancialPost[];
  totalAmount: number;
  totalElements: number;
}
