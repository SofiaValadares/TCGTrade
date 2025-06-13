import { fetchAPI } from '@/app/lib/apiClient';
import { 
  getAllDomainItems,
  getOneDomainItems,
  saveDomainItems,
  updateDomainItems,
  deleteDomainItems,
  getAllPageDomainItems
} from '../domainItems';
import { DomainItemsRecordDto, DomainItemsPageRecordDto } from '@/app/types/domainItems';
import { BasePageResponse } from '@/app/types/common';

// Mock do apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Itens de Domínio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllDomainItems', () => {
    it('deve retornar lista de itens de domínio com sucesso', async () => {
      const mockItems = [
        { idDomainItems: 1, idDomain: 1, codDomainItems: 'ITEM1', name: 'Item 1', enabled: true },
        { idDomainItems: 2, idDomain: 1, codDomainItems: 'ITEM2', name: 'Item 2', enabled: true }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockItems);

      const result = await getAllDomainItems();

      expect(fetchAPI).toHaveBeenCalledWith('/api/domain-items', {
        method: 'GET'
      });
      expect(result).toEqual(mockItems);
    });

    it('deve retornar lista de itens de domínio filtrada por idDomain com sucesso', async () => {
      const mockItems = [
        { idDomainItems: 1, idDomain: 1, codDomainItems: 'ITEM1', name: 'Item 1', enabled: true }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockItems);

      const result = await getAllDomainItems(1);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domain-items?idDomain=1', {
        method: 'GET'
      });
      expect(result).toEqual(mockItems);
    });

    it('deve lançar erro quando a requisição falhar', async () => {
      const error = new Error('Erro na requisição');
      (fetchAPI as jest.Mock).mockRejectedValue(error);

      await expect(getAllDomainItems()).rejects.toThrow('Erro na requisição');
    });
  });

  describe('getOneDomainItems', () => {
    it('deve retornar um item de domínio específico com sucesso', async () => {
      const mockItem = { idDomainItems: 1, idDomain: 1, codDomainItems: 'ITEM1', name: 'Item 1', enabled: true };
      (fetchAPI as jest.Mock).mockResolvedValue(mockItem);

      const result = await getOneDomainItems(1);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domain-items/1', {
        method: 'GET'
      });
      expect(result).toEqual(mockItem);
    });
  });

  describe('saveDomainItems', () => {
    it('deve salvar um novo item de domínio com sucesso', async () => {
      const newItem: DomainItemsRecordDto = {
        idDomain: 1,
        codDomainItems: 'NEWITEM',
        name: 'Novo Item',
        enabled: true
      };
      const mockResponse = { idDomainItems: 1, ...newItem };
      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await saveDomainItems(newItem);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domain-items', {
        method: 'POST',
        body: JSON.stringify(newItem)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateDomainItems', () => {
    it('deve atualizar um item de domínio existente com sucesso', async () => {
      const itemId = 1;
      const updateData: DomainItemsRecordDto = {
        idDomain: 1,
        codDomainItems: 'UPDITEM',
        name: 'Item Atualizado',
        enabled: true
      };
      const mockResponse = { idDomainItems: itemId, ...updateData };
      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await updateDomainItems(itemId, updateData);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domain-items/1', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteDomainItems', () => {
    it('deve deletar um item de domínio com sucesso', async () => {
      const itemId = 1;
      (fetchAPI as jest.Mock).mockResolvedValue(undefined);

      await deleteDomainItems(itemId);

      expect(fetchAPI).toHaveBeenCalledWith('/api/domain-items/1', {
        method: 'DELETE'
      });
    });
  });

  describe('getAllPageDomainItems', () => {
    it('deve retornar lista paginada de itens de domínio com sucesso', async () => {
      const params: DomainItemsPageRecordDto = {
        page: 1,
        size: 10,
        sort: 'name',
        order: 'asc',
        idDomain: 1,
        codDomainItems: 'TEST',
        name: 'Teste',
        enabled: true
      };
      const mockResponse: BasePageResponse<any> = {
        content: [
          { idDomainItems: 1, idDomain: 1, codDomainItems: 'ITEM1', name: 'Item 1', enabled: true }
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

      const result = await getAllPageDomainItems(params);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/domain-items/page?page=1&size=10&sort=name&order=asc&idDomain=1&codDomainItems=TEST&name=Teste&enabled=true'
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 