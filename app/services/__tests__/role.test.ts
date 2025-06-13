import { fetchAPI } from '@/app/lib/apiClient';
import { 
  getAllRoles,
  getOneRole,
  saveRole,
  updateRole,
  deleteRole
} from '../role';

// Mock do apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Roles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRoles', () => {
    it('deve retornar lista de roles com sucesso', async () => {
      const mockRoles = [
        { idRole: 1, roleName: 'ROLE_USER', authority: 'ROLE_USER' },
        { idRole: 2, roleName: 'ROLE_ADMIN', authority: 'ROLE_ADMIN' }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockRoles);

      const result = await getAllRoles();

      expect(fetchAPI).toHaveBeenCalledWith('/api/roles', {
        method: 'GET'
      });
      expect(result).toEqual(mockRoles);
    });
  });
}); 