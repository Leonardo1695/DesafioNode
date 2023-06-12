import { Body, Controller, Post, Delete, Get, Param } from '@nestjs/common';
import { FinancialPostService } from '../services/financial-post.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUser } from '../../user/interface/user.interface';
import { FinancialPostDTO } from '../dto';
import { FinancialPostCreateDTO } from '../dto/financial-post-create.dto';

@Controller('financial-post')
export class FinancialPostController {
  constructor(private readonly financialPostService: FinancialPostService) {}

  @Get('/:id')
  findOne(
    @Param() id: string,
    @CurrentUser() user: IUser,
  ): Promise<FinancialPostDTO> {
    return this.financialPostService.findById(id, user.id);
  }

  @Post('new')
  createNew(
    @Body() data: FinancialPostCreateDTO,
    @CurrentUser() user: IUser,
  ): Promise<FinancialPostDTO> {
    return this.financialPostService.create(data, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @CurrentUser() user: IUser): Promise<void> {
    return this.financialPostService.delete(id, user);
  }
}
