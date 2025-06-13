import { fetchAPI } from '@/app/lib/apiClient';
import { 
  getAllUsers,
  getOneUser,
  saveUser,
  updateUser,
  deleteUser,
  getAllPageUsers
} from '../user';
import { 
  UserRecordDto, 
  UserRecordPostDto, 
  UserResponseDto, 
  UserRoleResponseDto,
  PageUserResponseDto,
  RoleModel
} from '@/app/types/user';
import { BasePageResponse } from '@/app/types/common';

// Mock do apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Usuários', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('deve retornar lista de usuários com sucesso', async () => {
      const mockUsers: UserResponseDto[] = [
        { 
          idUser: 1, 
          name: 'Usuário 1',
          email: 'usuario1@teste.com',
          username: 'usuario1',
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
          enabled: true,
          telefone: '123456789'
        },
        { 
          idUser: 2, 
          name: 'Usuário 2',
          email: 'usuario2@teste.com',
          username: 'usuario2',
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
          enabled: true,
          telefone: '987654321'
        }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockUsers);

      const result = await getAllUsers();

      expect(fetchAPI).toHaveBeenCalledWith('/api/users', {
        method: 'GET'
      });
      expect(result).toEqual(mockUsers);
    });

    it('deve lançar erro quando a requisição falhar', async () => {
      const error = new Error('Erro na requisição');
      (fetchAPI as jest.Mock).mockRejectedValue(error);

      await expect(getAllUsers()).rejects.toThrow('Erro na requisição');
    });
  });

  describe('getOneUser', () => {
    it('deve retornar um usuário específico com sucesso', async () => {
      const mockUser: UserRoleResponseDto = {
        idUser: 1,
        name: 'Usuário 1',
        email: 'usuario1@teste.com',
        username: 'usuario1',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
        telefone: '123456789',
        roles: [
          {
            idRole: 1,
            roleName: 'ROLE_USER',
            authority: 'ROLE_USER',
            dateRegistered: '2024-01-01',
            userRegistered: 'admin',
            dateChanged: '2024-01-01',
            userChanged: 'admin'
          }
        ]
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockUser);

      const result = await getOneUser(1);

      expect(fetchAPI).toHaveBeenCalledWith('/api/users/1', {
        method: 'GET'
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('saveUser', () => {
    it('deve salvar um novo usuário com sucesso', async () => {
      const newUser: UserRecordDto = {
        name: 'Novo Usuário',
        email: 'novo@teste.com',
        username: 'novo',
        password: 'senha123',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
        roles: [
          {
            idRole: 1,
            roleName: 'ROLE_USER',
            authority: 'ROLE_USER',
            dateRegistered: '2024-01-01',
            userRegistered: 'admin',
            dateChanged: '2024-01-01',
            userChanged: 'admin'
          }
        ]
      };

      const mockResponse: UserRoleResponseDto = {
        idUser: 1,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        accountNonExpired: newUser.accountNonExpired!,
        accountNonLocked: newUser.accountNonLocked!,
        credentialsNonExpired: newUser.credentialsNonExpired!,
        enabled: newUser.enabled!,
        telefone: '',
        roles: newUser.roles!
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await saveUser(newUser);

      expect(fetchAPI).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateUser', () => {
    it('deve atualizar um usuário existente com sucesso', async () => {
      const userId = 1;
      const updateData: UserRecordPostDto = {
        name: 'Usuário Atualizado',
        email: 'atualizado@teste.com',
        username: 'atualizado',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
        roles: [
          {
            idRole: 1,
            roleName: 'ROLE_USER',
            authority: 'ROLE_USER',
            dateRegistered: '2024-01-01',
            userRegistered: 'admin',
            dateChanged: '2024-01-01',
            userChanged: 'admin'
          }
        ]
      };

      const mockResponse: UserRoleResponseDto = {
        idUser: userId,
        name: updateData.name,
        email: updateData.email,
        username: updateData.username,
        accountNonExpired: updateData.accountNonExpired!,
        accountNonLocked: updateData.accountNonLocked!,
        credentialsNonExpired: updateData.credentialsNonExpired!,
        enabled: updateData.enabled!,
        telefone: '',
        roles: updateData.roles!
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await updateUser(userId, updateData);

      expect(fetchAPI).toHaveBeenCalledWith('/api/users/1', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteUser', () => {
    it('deve deletar um usuário com sucesso', async () => {
      const userId = 1;
      (fetchAPI as jest.Mock).mockResolvedValue(undefined);

      await deleteUser(userId);

      expect(fetchAPI).toHaveBeenCalledWith('/api/users/1', {
        method: 'DELETE'
      });
    });
  });

  describe('getAllPageUsers', () => {
    it('deve retornar lista paginada de usuários com sucesso', async () => {
      const mockResponse: PageUserResponseDto = {
        content: [
          {
            idUser: 1,
            name: 'Usuário 1',
            email: 'usuario1@teste.com',
            username: 'usuario1',
            accountNonExpired: true,
            accountNonLocked: true,
            credentialsNonExpired: true,
            enabled: true,
            telefone: '123456789'
          }
        ],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 0,
        first: true,
        last: true,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        numberOfElements: 1,
        pageable: {
          offset: 0,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          paged: true,
          pageSize: 10,
          pageNumber: 0,
          unpaged: false
        },
        empty: false
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllPageUsers(0, 10, 'name', 'asc', 'Teste', 'teste@teste.com', 'teste');

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/users/page?page=0&size=10&sort=name&order=asc&name=Teste&email=teste%40teste.com&username=teste',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('deve retornar lista paginada de usuários sem filtros com sucesso', async () => {
      const mockResponse: PageUserResponseDto = {
        content: [
          {
            idUser: 1,
            name: 'Usuário 1',
            email: 'usuario1@teste.com',
            username: 'usuario1',
            accountNonExpired: true,
            accountNonLocked: true,
            credentialsNonExpired: true,
            enabled: true,
            telefone: '123456789'
          }
        ],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 0,
        first: true,
        last: true,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        numberOfElements: 1,
        pageable: {
          offset: 0,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          paged: true,
          pageSize: 10,
          pageNumber: 0,
          unpaged: false
        },
        empty: false
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllPageUsers();

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/users/page?page=0&size=10&sort=id&order=asc',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 