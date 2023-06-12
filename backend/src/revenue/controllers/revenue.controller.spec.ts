import { Test, TestingModule } from '@nestjs/testing';
import { RevenueController } from './revenue.controller';
import { RevenueService } from '../services/revenue.service';
import { RevenueDTO, RevenueFilterDTO } from '../dto';
import { IUser } from 'src/user/interface/user.interface';
import { ExecutionContext } from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

const mockFilter: RevenueFilterDTO = {
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  page: '1',
  itemsPerPage: '5',
};

const mockUser: IUser = {
  id: 'mockUserId',
  name: 'teste_name',
  email: 'test_email',
};

const mockRevenueDTO: RevenueDTO = {
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  financialPosts: [],
  totalAmount: 1000,
  totalElements: 10,
};

describe('RevenueController', () => {
  let controller: RevenueController;
  let service: RevenueService;

  beforeEach(async () => {
    const mockRevenueService = {
      search: jest.fn().mockResolvedValue({} as RevenueDTO),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueController],
      providers: [{ provide: RevenueService, useValue: mockRevenueService }],
    })
      .overrideGuard(CurrentUser)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          // Mock the behavior of the CurrentUser guard
          context.switchToHttp().getRequest().user = mockUser;
          return true;
        },
      })
      .compile();

    controller = module.get<RevenueController>(RevenueController);
    service = module.get<RevenueService>(RevenueService);
  });

  describe('searchRevenue', () => {
    it('should call the revenueService.search method with the provided filter and user', async () => {
      await controller.searchRevenue(mockFilter, mockUser);

      expect(service.search).toHaveBeenCalledWith(mockFilter, mockUser);
    });

    it('should return the result of revenueService.search method', async () => {
      jest.spyOn(service, 'search').mockResolvedValue(mockRevenueDTO);

      const result = await controller.searchRevenue(mockFilter, mockUser);

      expect(result).toEqual(mockRevenueDTO);
    });
  });
});
