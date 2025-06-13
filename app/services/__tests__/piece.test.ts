import { fetchAPI } from '@/app/lib/apiClient';
import { 
  getAllPieces,
  getOnePiece,
  savePiece,
  updatePiece,
  deletePiece,
  getAllPagePieces
} from '../piece';
import { PieceRecordDto, PieceResponseDto, PagePieceResponseDto } from '@/app/types/piece';

// Mock do módulo apiClient
jest.mock('@/app/lib/apiClient', () => ({
  fetchAPI: jest.fn()
}));

describe('Serviço de Peças', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPieces', () => {
    it('deve buscar todas as peças com sucesso', async () => {
      const mockResponse: PieceResponseDto[] = [
        {
          idPiece: 1,
          name: 'Peça 1',
          idProduct: 1,
          nameProduct: 'Produto 1',
          dateRegistered: '2024-01-01T00:00:00Z',
          userRegistered: 'admin',
          dateChanged: '2024-01-01T00:00:00Z',
          userChanged: 'admin'
        }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllPieces();

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('deve buscar peças por produto com sucesso', async () => {
      const mockResponse: PieceResponseDto[] = [
        {
          idPiece: 1,
          name: 'Peça 1',
          idProduct: 1,
          nameProduct: 'Produto 1',
          dateRegistered: '2024-01-01T00:00:00Z',
          userRegistered: 'admin',
          dateChanged: '2024-01-01T00:00:00Z',
          userChanged: 'admin'
        }
      ];

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllPieces('1');

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces?idProduct=1',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOnePiece', () => {
    it('deve buscar uma peça específica com sucesso', async () => {
      const mockResponse: PieceResponseDto = {
        idPiece: 1,
        name: 'Peça 1',
        idProduct: 1,
        nameProduct: 'Produto 1',
        dateRegistered: '2024-01-01T00:00:00Z',
        userRegistered: 'admin',
        dateChanged: '2024-01-01T00:00:00Z',
        userChanged: 'admin'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getOnePiece(1);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces/1',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('savePiece', () => {
    it('deve salvar uma nova peça com sucesso', async () => {
      const mockData: PieceRecordDto = {
        name: 'Nova Peça',
        idProduct: 1
      };

      const mockResponse: PieceResponseDto = {
        idPiece: 1,
        name: mockData.name,
        idProduct: mockData.idProduct,
        nameProduct: 'Produto 1',
        dateRegistered: '2024-01-01T00:00:00Z',
        userRegistered: 'admin',
        dateChanged: '2024-01-01T00:00:00Z',
        userChanged: 'admin'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await savePiece(mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces',
        {
          method: 'POST',
          body: JSON.stringify(mockData)
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updatePiece', () => {
    it('deve atualizar uma peça existente com sucesso', async () => {
      const mockData: PieceRecordDto = {
        name: 'Peça Atualizada',
        idProduct: 1
      };

      const mockResponse: PieceResponseDto = {
        idPiece: 1,
        name: mockData.name,
        idProduct: mockData.idProduct,
        nameProduct: 'Produto 1',
        dateRegistered: '2024-01-01T00:00:00Z',
        userRegistered: 'admin',
        dateChanged: '2024-01-01T00:00:00Z',
        userChanged: 'admin'
      };

      (fetchAPI as jest.Mock).mockResolvedValue(mockResponse);

      const result = await updatePiece(1, mockData);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces/1',
        {
          method: 'PUT',
          body: JSON.stringify(mockData)
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deletePiece', () => {
    it('deve excluir uma peça com sucesso', async () => {
      (fetchAPI as jest.Mock).mockResolvedValue(undefined);

      await deletePiece(1);

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces/1',
        {
          method: 'DELETE'
        }
      );
    });
  });

  describe('getAllPagePieces', () => {
    it('deve buscar peças paginadas com sucesso', async () => {
      const mockResponse: PagePieceResponseDto = {
        content: [
          {
            idPiece: 1,
            name: 'Peça 1',
            idProduct: 1,
            nameProduct: 'Produto 1',
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

      const result = await getAllPagePieces(0, 10, 'id', 'asc', 1, 'Peça');

      expect(fetchAPI).toHaveBeenCalledWith(
        '/api/pieces/page?page=0&size=10&sort=id&order=asc&idProduct=1&name=Pe%C3%A7a',
        {
          method: 'GET'
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
}); 