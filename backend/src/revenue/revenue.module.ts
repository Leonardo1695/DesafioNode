import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueController } from './controllers/revenue.controller';
import { RevenueService } from './services/revenue.service';
import { FinancialPostService } from './services/financial-post.service';
import FinancialPost from './entities/financial-post.entity';
import { FinancialPostRepository } from './repositories/financial-post.repository';
import { FinancialPostController } from './controllers/financial-post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialPost])],
  controllers: [RevenueController, FinancialPostController],
  providers: [FinancialPostRepository, FinancialPostService, RevenueService],
})
export class RevenueModule {}
