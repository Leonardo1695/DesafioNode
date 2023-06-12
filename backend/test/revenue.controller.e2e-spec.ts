import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RevenueModule } from '../src/revenue/revenue.module';
import { RevenueController } from '../src/revenue/controllers/revenue.controller';
import { RevenueService } from '../src/revenue/services/revenue.service';
import { FinancialPostService } from '../src/revenue/services/financial-post.service';
import { FinancialPostRepository } from '../src/revenue/repositories/financial-post.repository';
import { IUser } from '../src/user/interface/user.interface';
import { RevenueDTO, RevenueFilterDTO } from '../src/Revenue/dto';

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

describe('RevenueModule (E2E)', () => {
  let app: INestApplication;
  let controller: RevenueController;
  let service: RevenueService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RevenueModule],
      providers: [
        RevenueService,
        FinancialPostService,
        FinancialPostRepository,
      ],
    }).compile();

    controller = moduleFixture.get<RevenueController>(RevenueController);
    service = moduleFixture.get<RevenueService>(RevenueService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /revenue', () => {
    it('should call the revenueService.search method with the provided filter and user', async () => {
      await request(app.getHttpServer())
        .get('/revenue')
        .query(mockFilter)
        .set('Authorization', 'Bearer mockToken')
        .set('Accept', 'application/json')
        .expect(200);

      expect(service.search).toHaveBeenCalledWith(mockFilter, mockUser);
    });

    it('should return the result of revenueService.search method', async () => {
      jest.spyOn(service, 'search').mockResolvedValue(mockRevenueDTO);

      const response = await request(app.getHttpServer())
        .get('/revenue')
        .query(mockFilter)
        .set('Authorization', 'Bearer mockToken')
        .set('Accept', 'application/json')
        .expect(200);

      expect(response.body).toEqual(mockRevenueDTO);
    });
  });
});
