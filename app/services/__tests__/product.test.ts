import { fetchAPI } from '@/app/lib/apiClient';
import { 
  getAllProducts,
  getOneProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  getAllPageProducts
} from '../product';
import { ProductRecordDto, ProductResponseDto, PageProductResponseDto } from '@/app/types/product';

// Mock do módulo apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Produtos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('deve buscar todos os produtos com sucesso', async () => {
      const mockResponse: ProductResponseDto[] = [
        {
          idProduct: 1,
          name: 'Produto 1',
          value: 100,
          tax: 10,
          dateRegistered: '2024-01-01T00:00:00Z',
          userRegistered: 'admin',
          dateChanged: '2024-01-01T00:00:00Z',
          userChanged: 'admin'
        }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllProducts();

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/products',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOneProduct', () => {
    it('deve buscar um produto específico com sucesso', async () => {
      const mockResponse: ProductResponseDto = {
        idProduct: 1,
        name: 'Produto 1',
        value: 100,
        tax: 10,
        dateRegistered: '2024-01-01T00:00:00Z',
        userRegistered: 'admin',
        dateChanged: '2024-01-01T00:00:00Z',
        userChanged: 'admin'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getOneProduct(1);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/products/1',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveProduct', () => {
    it('deve salvar um novo produto com sucesso', async () => {
      const mockData: ProductRecordDto = {
        name: 'Novo Produto',
        value: 100
      };

      const mockResponse: ProductResponseDto = {
        idProduct: 1,
        name: mockData.name,
        value: mockData.value,
        tax: 10,
        dateRegistered: '2024-01-01T00:00:00Z',
        userRegistered: 'admin',
        dateChanged: '2024-01-01T00:00:00Z',
        userChanged: 'admin'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await saveProduct(mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/products',
        {
          method: 'POST',
          body: JSON.stringify(mockData)
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProduct', () => {
    it('deve atualizar um produto existente com sucesso', async () => {
      const mockData: ProductRecordDto = {
        name: 'Produto Atualizado',
        value: 200
      };

      const mockResponse: ProductResponseDto = {
        idProduct: 1,
        name: mockData.name,
        value: mockData.value,
        tax: 20,
        dateRegistered: '2024-01-01T00:00:00Z',
        userRegistered: 'admin',
        dateChanged: '2024-01-01T00:00:00Z',
        userChanged: 'admin'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await updateProduct(1, mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/products/1',
        {
          method: 'PUT',
          body: JSON.stringify(mockData)
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteProduct', () => {
    it('deve excluir um produto com sucesso', async () => {
      (fetchAPI as jest.Mock).mockResolvedValue(undefined);

      await deleteProduct(1);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/products/1',
        {
          method: 'DELETE'
        }
      );
    });
  });

  describe('getAllPageProducts', () => {
    it('deve buscar produtos paginados com sucesso', async () => {
      const mockResponse: PageProductResponseDto = {
        content: [
          {
            idProduct: 1,
            name: 'Produto 1',
            value: 100,
            tax: 10,
            dateRegistered: '2024-01-01T00:00:00Z',
            userRegistered: 'admin',
            dateChanged: '2024-01-01T00:00:00Z',
            userChanged: 'admin'
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

      const result = await getAllPageProducts(0, 10, 'id', 'asc', 'Produto', 100, 10);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/products/page?page=0&size=10&sort=id&order=asc&name=Produto&value=100&tax=10',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 