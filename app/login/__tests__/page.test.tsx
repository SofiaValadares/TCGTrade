import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../page';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn()
}));

const mockPush = jest.fn();

describe('Página de Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('deve renderizar os campos e botões corretamente', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false
    });
    render(<LoginPage />);
    expect(screen.getByLabelText('Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve permitir preencher e submeter o formulário', () => {
    const mutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate,
      isPending: false,
      isError: false
    });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('Usuário'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(mutate).toHaveBeenCalledWith({ username: 'admin', password: '123456' });
  });

  it('deve exibir loading ao submeter', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      isError: false
    });
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /entrando/i })).toBeDisabled();
  });

  it('deve exibir mensagem de erro se o login falhar', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: true,
      error: { message: 'Credenciais inválidas' }
    });
    render(<LoginPage />);
    expect(screen.getByText(/erro: credenciais inválidas/i)).toBeInTheDocument();
  });

  it('deve redirecionar para o dashboard em caso de sucesso', async () => {
    let onSuccess: (data: { jwt: string }) => void = () => {};
    (useMutation as jest.Mock).mockImplementation(({ onSuccess: _onSuccess }) => {
      onSuccess = _onSuccess;
      return {
        mutate: jest.fn(),
        isPending: false,
        isError: false
      };
    });
    render(<LoginPage />);
    // Simula sucesso do login
    await waitFor(() => {
      onSuccess({ jwt: 'token123' });
    });
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
}); 