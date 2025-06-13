import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '../EmptyState';

describe('Componente EmptyState', () => {
  it('deve renderizar corretamente com as props obrigatórias', () => {
    const title = 'Sem Dados';
    render(<EmptyState title={title} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('deve renderizar com mensagem quando fornecida', () => {
    const title = 'Sem Dados';
    const message = 'Não há dados para exibir';
    render(<EmptyState title={title} message={message} />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('deve renderizar com ícone personalizado quando fornecido', () => {
    const title = 'Sem Dados';
    const customIcon = <div data-testid="custom-icon">Ícone</div>;
    render(<EmptyState title={title} icon={customIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('deve renderizar com botão de ação quando fornecido', () => {
    const title = 'Sem Dados';
    const actionLabel = 'Adicionar Novo';
    const handleClick = jest.fn();
    
    render(
      <EmptyState 
        title={title} 
        action={{ 
          label: actionLabel, 
          onClick: handleClick 
        }} 
      />
    );
    
    const button = screen.getByText(actionLabel);
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar com ícone padrão quando nenhum ícone personalizado é fornecido', () => {
    const title = 'Sem Dados';
    render(<EmptyState title={title} />);
    
    const defaultIcon = document.querySelector('.defaultIcon');
    expect(defaultIcon).toBeInTheDocument();
  });
}); 