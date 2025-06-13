import { render, screen } from '@testing-library/react';
import QueryProvider from '../QueryProvider';

describe('QueryProvider', () => {
  it('deve renderizar os filhos corretamente', () => {
    render(
      <QueryProvider>
        <div>Conteúdo de Teste</div>
      </QueryProvider>
    );
    expect(screen.getByText('Conteúdo de Teste')).toBeInTheDocument();
  });
}); 