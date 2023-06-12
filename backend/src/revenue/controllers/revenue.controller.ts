import { Controller, Get, Query } from '@nestjs/common';
import { RevenueService } from '../services/revenue.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUser } from '../../user/interface/user.interface';
import { RevenueDTO, RevenueFilterDTO } from '../dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  searchRevenue(
    @Query() filter: RevenueFilterDTO,
    @CurrentUser() user: IUser,
  ): Promise<RevenueDTO> {
    return this.revenueService.search(filter, user);
  }
}
