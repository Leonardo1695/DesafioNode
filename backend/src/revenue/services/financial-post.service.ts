import { IFinancialPostCreate } from './../interfaces/financial-post-create.interface';
import { IFinancialPost } from './../interfaces/financial-post.interface';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { IDateInterval, IRevenueFilter } from '../interfaces';
import {
  FinancialPostRepository,
  FinancialPostSearchReturn,
} from '../repositories/financial-post.repository';
import { IUser } from 'src/user/interface/user.interface';

@Injectable()
export class FinancialPostService {
  constructor(private financialPostRepository: FinancialPostRepository) {}

  async searchFinanciaPosts(
    userId: string,
    filter: IRevenueFilter,
  ): Promise<FinancialPostSearchReturn> {
    const response = await this.financialPostRepository.filterFinancialPosts(
      userId,
      filter,
    );
    return response;
  }

  async create(
    data: IFinancialPostCreate,
    currentUser: IUser,
  ): Promise<IFinancialPost> {
    if (!data) throw new BadRequestException();
    try {
      const entity = this.financialPostRepository.create({
        ...data,
        userId: currentUser.id,
      });
      const response = await this.financialPostRepository.save(entity);
      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findById(
    id: string,
    userId: string,
  ): Promise<IFinancialPost | undefined> {
    const result = await this.financialPostRepository.findById(id, userId);
    return result;
  }

  async delete(id: string, currentUser: IUser): Promise<void> {
    if (!id) throw new BadRequestException();

    const financialPost = await this.findById(id, currentUser.id);

    if (!financialPost)
      throw new BadRequestException('financial post not found!');

    if (currentUser.id !== financialPost.userId)
      throw new BadRequestException(
        'cannot delete financial post from another user!',
      );

    try {
      //await this.financialPostRepository.delete(id);
      await this.financialPostRepository.delete({ id });
      return;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
