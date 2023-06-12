import { Between, DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import FinancialPost from '../entities/financial-post.entity';
import { IDateInterval, IRevenueFilter } from '../interfaces';

export class FinancialPostSearchReturn {
  content: FinancialPost[];
  totalElements: number;

  constructor(content: FinancialPost[], totalElements: number) {
    this.content = content;
    this.totalElements = totalElements;
  }
}

@Injectable()
export class FinancialPostRepository extends Repository<FinancialPost> {
  constructor(private dataSource: DataSource) {
    super(FinancialPost, dataSource.createEntityManager());
  }

  async filterFinancialPosts(
    userId: string,
    filter: IRevenueFilter,
  ): Promise<FinancialPostSearchReturn> {
    const { startDate, endDate, itemsPerPage, page } = filter;
    const [list, total] = await this.findAndCount({
      where: {
        userId,
        createdAt: Between(new Date(startDate), new Date(endDate)),
      },
      take: Number(itemsPerPage),
      skip: Number(page) - 1 * Number(itemsPerPage),
    });

    const response = new FinancialPostSearchReturn(list, total);

    return response;
  }

  async findById(
    id: string,
    userId: string,
  ): Promise<FinancialPost | undefined> {
    const response = await this.findOne({
      where: { id, userId },
    });

    return response;
  }
}
