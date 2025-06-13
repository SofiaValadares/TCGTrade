import { fetchAPI } from '@/app/lib/apiClient';
import { login, logout, validateToken, changePassword, activateUser } from '../auth';
import { AuthRequestModel, AuthResponseDto, AuthResponseModel, AuthChangePasswordRecordDto, ActivateRecordDto } from '@/app/types/auth';
import { UserRoleResponseDto } from '@/app/types/user';

// Mock do módulo apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Autenticação', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const mockData: AuthRequestModel = {
        username: 'teste',
        password: 'senha123'
      };

      const mockResponse: AuthResponseDto = {
        token: 'token123',
        user: {
          id: 1,
          username: 'teste',
          name: 'Usuário Teste',
          email: 'teste@teste.com',
          enabled: true
        }
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await login(mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/login',
        {
          method: 'POST',
          body: JSON.stringify(mockData)
        },
        false
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logout', () => {
    it('deve fazer logout com sucesso', async () => {
      const mockResponse = 'Logout realizado com sucesso';
      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await logout();

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/logout',
        {
          method: 'POST'
        }
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('validateToken', () => {
    it('deve validar token com sucesso', async () => {
      const mockToken = 'token123';
      const mockResponse: AuthResponseModel = {
        id: 1,
        username: 'teste',
        name: 'Usuário Teste',
        email: 'teste@teste.com',
        enabled: true
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await validateToken(mockToken);

      expect(fetchAPI).toHaveBeenCalledWith(
        `/api/validate/${mockToken}`,
        {
          method: 'GET'
        },
        false
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('changePassword', () => {
    it('deve alterar senha com sucesso', async () => {
      const mockData: AuthChangePasswordRecordDto = {
        oldPassword: 'senha123',
        newPassword: 'novaSenha123'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(undefined);

      await changePassword(mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/change-password',
        {
          method: 'POST',
          body: JSON.stringify(mockData)
        }
      );
    });
  });

  describe('activateUser', () => {
    it('deve ativar usuário com sucesso', async () => {
      const mockData: ActivateRecordDto = {
        username: 'teste',
        password: 'senha123'
      };

      const mockResponse: UserRoleResponseDto = {
        id: 1,
        username: 'teste',
        name: 'Usuário Teste',
        email: 'teste@teste.com',
        enabled: true,
        roles: ['USER']
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await activateUser(mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/activate',
        {
          method: 'POST',
          body: JSON.stringify(mockData)
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 