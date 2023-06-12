import { Test, TestingModule } from '@nestjs/testing';
import { FinancialPostController } from './financial-post.controller';
import { FinancialPostService } from '../services/financial-post.service';
import { IUser } from '../../user/interface/user.interface';
import { FinancialPostDTO } from '../dto';
import { FinancialPostCreateDTO } from '../dto/financial-post-create.dto';
import { FinancialPostType } from '../enum';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ExecutionContext } from '@nestjs/common';

const mockFinancialPostCreateData: FinancialPostCreateDTO = {
  description: 'Mock description',
  amount: 1000,
  type: FinancialPostType.INCOME,
};

const mockUser: IUser = {
  id: 'mockUserId',
  name: 'teste_name',
  email: 'test_email',
};

const mockFinancialPostDTO: FinancialPostDTO = {
  id: 'mockId',
  userId: 'mockUserId',
  description: 'Mock description',
  amount: 1000,
  type: FinancialPostType.INCOME,
  createdAt: new Date(),
};

describe('FinancialPostController', () => {
  let controller: FinancialPostController;
  let service: FinancialPostService;

  beforeEach(async () => {
    const mockFinancialPostService = {
      findById: jest.fn().mockResolvedValue({} as FinancialPostDTO),
      create: jest.fn().mockResolvedValue({} as FinancialPostDTO),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialPostController],
      providers: [
        { provide: FinancialPostService, useValue: mockFinancialPostService },
      ],
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

    controller = module.get<FinancialPostController>(FinancialPostController);
    service = module.get<FinancialPostService>(FinancialPostService);
  });

  describe('findOne', () => {
    it('should call the financialPostService.findById method with the provided id and user id', async () => {
      const mockId = 'mockId';

      await controller.findOne(mockId, mockUser);

      expect(service.findById).toHaveBeenCalledWith(mockId, mockUser.id);
    });

    it('should return the result of financialPostService.findById method', async () => {
      const mockId = 'mockId';

      jest.spyOn(service, 'findById').mockResolvedValue(mockFinancialPostDTO);

      const result = await controller.findOne(mockId, mockUser);

      expect(result).toEqual(mockFinancialPostDTO);
    });
  });

  describe('createNew', () => {
    it('should call the financialPostService.create method with the provided data and user', async () => {
      await controller.createNew(mockFinancialPostCreateData, mockUser);

      expect(service.create).toHaveBeenCalledWith(
        mockFinancialPostCreateData,
        mockUser,
      );
    });

    it('should return the result of financialPostService.create method', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockFinancialPostDTO);

      const result = await controller.createNew(
        mockFinancialPostCreateData,
        mockUser,
      );

      expect(result).toEqual(mockFinancialPostDTO);
    });
  });

  describe('delete', () => {
    it('should call the financialPostService.delete method with the provided id and user', async () => {
      const mockId = 'mockId';

      await controller.delete(mockId, mockUser);

      expect(service.delete).toHaveBeenCalledWith(mockId, mockUser);
    });

    it('should return void', async () => {
      const mockId = 'mockId';

      const result = await controller.delete(mockId, mockUser);

      expect(result).toBeUndefined();
    });
  });
});
