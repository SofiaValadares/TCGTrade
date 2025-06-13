import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import MainLayout from '../layout';
import { logout } from '@/app/services/auth';

// Mock dos módulos
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn()
}));

jest.mock('@/app/services/auth', () => ({
  logout: jest.fn()
}));

describe('MainLayout', () => {
  const mockRouter = {
    replace: jest.fn()
  };

  const mockQueryClient = {
    clear: jest.fn()
  };

  beforeEach(() => {
    // Configurar mocks
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    
    // Mock do localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      removeItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve redirecionar para login quando não houver token', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    
    render(
      <MainLayout>
        <div>Conteúdo de teste</div>
      </MainLayout>
    );

    expect(mockRouter.replace).toHaveBeenCalledWith('/login');
  });

  it('deve renderizar o layout quando houver token', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('token123');
    
    render(
      <MainLayout>
        <div>Conteúdo de teste</div>
      </MainLayout>
    );

    expect(screen.getByText('Bem-vindo!')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });

  it('deve fazer logout corretamente', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('token123');
    (logout as jest.Mock).mockResolvedValue(undefined);
    
    render(
      <MainLayout>
        <div>Conteúdo de teste</div>
      </MainLayout>
    );

    // Simular o clique no botão de logout
    const logoutButton = screen.getByRole('button', { name: /sair/i });
    fireEvent.click(logoutButton);

    // Verificar se o logout foi chamado
    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('jwt_token');
      expect(mockQueryClient.clear).toHaveBeenCalled();
      expect(mockRouter.replace).toHaveBeenCalledWith('/login');
    });
  });

  it('deve mostrar alerta quando o logout falhar', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('token123');
    (logout as jest.Mock).mockRejectedValue(new Error('Erro no logout'));
    
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <MainLayout>
        <div>Conteúdo de teste</div>
      </MainLayout>
    );

    // Simular o clique no botão de logout
    const logoutButton = screen.getByRole('button', { name: /sair/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith('Não foi possível fazer logout. Tente novamente.');
    });

    mockAlert.mockRestore();
  });
}); 