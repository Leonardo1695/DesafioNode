import { Injectable } from '@nestjs/common';
import { IRevenueFilter } from '../interfaces/revenue-filter.interface';
import { IUser } from 'src/user/interface/user.interface';
import { IRevenue } from '../interfaces/revenue.interface';
import { FinancialPostService } from './financial-post.service';
import { FinancialPostType } from '../enum';

@Injectable()
export class RevenueService {
  constructor(private financialPostService: FinancialPostService) {}

  async search(filter: IRevenueFilter, user: IUser): Promise<IRevenue> {
    const { content, totalElements } =
      await this.financialPostService.searchFinanciaPosts(user.id, filter);

    const totalAmount = content.reduce((a, b) => {
      if (b.type === FinancialPostType.INCOME) return a + b.amount;
      else return a - b.amount;
    }, 0);

    const { startDate, endDate } = filter;
    const response: IRevenue = {
      startDate,
      endDate,
      totalElements,
      financialPosts: content,
      totalAmount,
    };

    return response;
  }
}
