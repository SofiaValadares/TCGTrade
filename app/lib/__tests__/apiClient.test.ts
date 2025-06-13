import { fetchAPI } from '../apiClient';

describe('fetchAPI', () => {
  const originalFetch = global.fetch;
  const originalLocalStorage = global.localStorage;

  beforeEach(() => {
    // Mock do localStorage
    const localStorageMock = {
      getItem: jest.fn(() => 'token123'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };

    // Configurar window e localStorage
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: localStorageMock
      },
      writable: true
    });

    // Configurar fetch mock
    global.fetch = jest.fn();

    // Configurar localStorage global
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    global.localStorage = originalLocalStorage;
    jest.clearAllMocks();
  });

  it('deve fazer uma requisição GET e retornar os dados', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ sucesso: true }),
      headers: { get: () => '123' }
    });

    const data = await fetchAPI('/teste');
    expect(data).toEqual({ sucesso: true });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/teste'),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer token123' })
      })
    );
  });

  it('deve lançar erro se a resposta não for ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Erro de API' }),
      statusText: 'Bad Request',
      headers: { get: () => '123' }
    });
    await expect(fetchAPI('/erro')).rejects.toThrow('Erro de API');
  });

  it('deve retornar undefined para resposta 204 (sem conteúdo)', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => ({}),
      headers: { get: () => '0' }
    });
    const data = await fetchAPI('/sem-conteudo');
    expect(data).toBeUndefined();
  });

  it('deve incluir o header Authorization se houver token', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
      headers: { get: () => '123' }
    });
    await fetchAPI('/com-token');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer token123' })
      })
    );
  });

  it('não deve incluir o header Authorization se includeAuthHeader for false', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
      headers: { get: () => '123' }
    });
    await fetchAPI('/sem-auth', {}, false);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.not.objectContaining({ Authorization: expect.any(String) })
      })
    );
  });
}); 