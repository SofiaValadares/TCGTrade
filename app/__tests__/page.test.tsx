import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Home from '../page';

// Mock do módulo next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Home', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    // Mock do localStorage
    const localStorageMock = {
      getItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve redirecionar para o dashboard quando houver token', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('token123');
    
    render(<Home />);
    
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('deve redirecionar para o login quando não houver token', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    
    render(<Home />);
    
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });

  it('não deve renderizar nenhum conteúdo', () => {
    const { container } = render(<Home />);
    expect(container).toBeEmptyDOMElement();
  });
}); 