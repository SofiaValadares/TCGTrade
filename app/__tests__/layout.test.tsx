import { render } from '@testing-library/react';
import RootLayout from '../layout';

// Mock do QueryProvider
jest.mock('@/app/lib/QueryProvider', () => {
  return function MockQueryProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="query-provider">{children}</div>;
  };
});

describe('RootLayout', () => {
  it('deve renderizar o layout com o QueryProvider', () => {
    const { container } = render(
      <RootLayout>
        <div>Conteúdo de teste</div>
      </RootLayout>
    );

    // Verificar se o HTML tem a estrutura correta
    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
    expect(container.querySelector('body')).toHaveClass('className');
    
    // Verificar se o QueryProvider está presente
    expect(container.querySelector('[data-testid="query-provider"]')).toBeInTheDocument();
    
    // Verificar se o conteúdo filho está presente
    expect(container.textContent).toContain('Conteúdo de teste');
  });

  it('deve ter os metadados corretos', () => {
    const { metadata } = require('../layout');
    
    expect(metadata.title).toBe('arq-front-react');
    expect(metadata.description).toBe('Tamplete - Front React');
  });
}); 