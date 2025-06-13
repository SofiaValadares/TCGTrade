import { fetchAPI } from '@/app/lib/apiClient';
import { 
  getAllDomains,
  getOneDomain,
  saveDomain,
  updateDomain,
  deleteDomain,
  getAllPageDomains,
  getAllDomainsList
} from '../domain';
import { DomainRecordDto, DomainPageRecordDto } from '@/app/types/domain';
import { BasePageResponse } from '@/app/types/common';

// Mock do apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Domínios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllDomains', () => {
    it('deve retornar lista de domínios com sucesso', async () => {
      const mockDomains = [
        { id: 1, name: 'Domínio 1', description: 'Descrição 1' },
        { id: 2, name: 'Domínio 2', description: 'Descrição 2' }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockDomains);

      const result = await getAllDomains();

      expect(fetchAPI).toHaveBeenCalledWith('/api/domains', {
        method: 'GET'
      });
      expect(result).toEqual(mockDomains);
    });

    it('deve lançar erro quando a requisição falhar', async () => {
      const error = new Error('Erro na requisição');
      (fetchAPI as jest.Mock).mockRejectedValue(error);

      await expect(getAllDomains()).rejects.toThrow('Erro na requisição');
    });
  });

  describe('getOneDomain', () => {
    it('deve retornar um domínio específico com sucesso', async () => {
      const mockDomain = { id: 1, name: 'Domínio 1', description: 'Descrição 1' };
      (fetchAPI as jest.Mock).mockResolvedValue(mockDomain);

      const result = await getOneDomain(1);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domains/1', {
        method: 'GET'
      });
      expect(result).toEqual(mockDomain);
    });
  });

  describe('saveDomain', () => {
    it('deve salvar um novo domínio com sucesso', async () => {
      const newDomain: DomainRecordDto = {
        name: 'Novo Domínio',
        description: 'Nova Descrição'
      };
      const mockResponse = { id: 1, ...newDomain };
      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await saveDomain(newDomain);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domains', {
        method: 'POST',
        body: JSON.stringify(newDomain)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateDomain', () => {
    it('deve atualizar um domínio existente com sucesso', async () => {
      const domainId = 1;
      const updateData: DomainRecordDto = {
        name: 'Domínio Atualizado',
        description: 'Descrição Atualizada'
      };
      const mockResponse = { id: domainId, ...updateData };
      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await updateDomain(domainId, updateData);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domains/1', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteDomain', () => {
    it('deve deletar um domínio com sucesso', async () => {
      const domainId = 1;
      (fetchAPI as jest.Mock).mockResolvedValue(undefined);

      await deleteDomain(domainId);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domains/1', {
        method: 'DELETE'
      });
    });
  });

  describe('getAllPageDomains', () => {
    it('deve retornar lista paginada de domínios com sucesso', async () => {
      const params: DomainPageRecordDto = {
        page: 1,
        size: 10,
        sort: 'name',
        order: 'asc',
        name: 'Teste',
        description: 'Descrição'
      };
      const mockResponse: BasePageResponse<any> = {
        content: [
          { id: 1, name: 'Domínio 1', description: 'Descrição 1' }
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

      const result = await getAllPageDomains(params);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/domains/page?page=1&size=10&sort=name&order=asc&name=Teste&description=Descri%C3%A7%C3%A3o'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAllDomainsList', () => {
    it('deve retornar lista de domínios para um domínio específico com sucesso', async () => {
      const domainId = 1;
      const mockResponse = {
        domains: [
          { id: 1, name: 'Domínio 1', description: 'Descrição 1' }
        ]
      };
      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllDomainsList(domainId);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domains/list/1', {
        method: 'GET'
      });
      expect(result).toEqual(mockResponse);
    });
  });
}); 