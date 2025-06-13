import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';

jest.mock('@/app/components/DashboardLayout', () => ({
  __esModule: true,
  default: ({ children, title }: any) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}));

describe('Página de Dashboard', () => {
  it('deve renderizar o título e os cards de estatísticas', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total de Domínios')).toBeInTheDocument();
    expect(screen.getByText('Usuários Ativos')).toBeInTheDocument();
    expect(screen.getByText('Uptime do Sistema')).toBeInTheDocument();
    expect(screen.getByText('Requisições Hoje')).toBeInTheDocument();
  });

  it('deve renderizar a seção de atividade recente', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Atividade Recente')).toBeInTheDocument();
    expect(screen.getByText(/adicionou um novo domínio/i)).toBeInTheDocument();
    expect(screen.getByText(/atualizou o domínio/i)).toBeInTheDocument();
    expect(screen.getByText(/removeu o domínio/i)).toBeInTheDocument();
    expect(screen.getByText(/criou um novo usuário/i)).toBeInTheDocument();
  });

  it('deve renderizar a seção de acesso rápido', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Acesso Rápido')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar Domínios')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar Usuários')).toBeInTheDocument();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Ajuda')).toBeInTheDocument();
  });
}); 