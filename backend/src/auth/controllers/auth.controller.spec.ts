import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthResponseDTO } from '../dto/auth-response.dto';
import { AuthRequestDTO } from '../dto/auth-request.dto';
import { IUser } from '../../user/interface/user.interface';

const mockData: AuthRequestDTO = {
  email: 'teste@email.com',
  password: 'mock_password',
};

const mockUser: IUser = {
  id: 'mockUserId',
  name: 'teste_name',
  email: 'test_email',
};

const mockAuthResponseDTO: AuthResponseDTO = {
  user: mockUser,
  token: 'mock_token',
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      authenticate: jest.fn().mockResolvedValue({} as AuthResponseDTO),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call the authService.authenticate method with the provided data', async () => {
      await controller.signIn(mockData);

      expect(service.authenticate).toHaveBeenCalledWith(mockData);
    });

    it('should return the result of authService.authenticate method', async () => {
      jest
        .spyOn(service, 'authenticate')
        .mockResolvedValue(mockAuthResponseDTO);

      const result = await controller.signIn(mockData);

      expect(result).toEqual(mockAuthResponseDTO);
    });
  });
});
