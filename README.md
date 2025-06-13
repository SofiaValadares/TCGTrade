# arq-front-react - Aplicação Front-end React com Next.js

Este projeto é uma aplicação front-end construída com React e Next.js, seguindo as especificações do `package.json` fornecido.

## Funcionalidades Implementadas

*   **Autenticação:**
    *   Tela de Login (`/login`) para autenticação de usuários.
    *   Serviço de Logout.
    *   Integração com Keycloak para autenticação.
*   **Gerenciamento de Domínios (`/domains`):**
    *   CRUD completo (Criar, Ler, Atualizar, Deletar) para a entidade "Domain".
    *   Listagem paginada dos domínios.
    *   Modal para criação e edição de domínios.

## Tecnologias Utilizadas

*   **Framework:** Next.js (v15.3.0) com App Router e Turbopack.
*   **Linguagem:** TypeScript (v5).
*   **UI Library:** 
    * React (v18.2.0)
    * Material-UI (MUI) v7.0.1
    * Styled Components
*   **Gerenciamento de Estado:**
    * TanStack Query (React Query) v5.72.1
    * Redux Toolkit v2.6.1
*   **Estilização:** 
    * SASS/SCSS Modules
    * Styled Components
    * Material-UI System
*   **Testes:** 
    * Jest v29.7.0
    * React Testing Library
    * Enzyme
*   **Linting:** ESLint com a configuração padrão do Next.js.
*   **Manipulação de Datas:** date-fns v4.1.0
*   **Autenticação:** Keycloak v26.1.4
*   **Análise de Código:** SonarQube Scanner

## Pré-requisitos

*   Node.js (versão recomendada pelo Next.js 15, geralmente LTS - ex: v18.18.0 ou superior).
*   npm ou Yarn.
*   Um servidor backend rodando na URL especificada em `.env.local` (padrão: `http://localhost:8080`).
*   Keycloak configurado e acessível (URL configurável via variáveis de ambiente).

## Configuração do Ambiente

1.  **Clone o repositório (se aplicável):**
    ```bash
    git clone <url-do-repositorio>
    cd arq-front-react
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo, ajustando as URLs conforme necessário:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
    ```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

*   **`npm run dev`** ou **`yarn dev`**
    *   Inicia a aplicação em modo de desenvolvimento com Turbopack.
    *   Abra http://localhost:3000 para visualizá-la no navegador.
    *   A página será recarregada automaticamente se você fizer edições.

*   **`npm run build`** ou **`yarn build`**
    *   Compila a aplicação para produção na pasta `.next`.

*   **`npm run start`** ou **`yarn start`**
    *   Inicia a aplicação em modo de produção (após executar o build).

*   **`npm run lint`** ou **`yarn lint`**
    *   Executa o ESLint para verificar problemas de formatação e estilo no código.

*   **`npm run test`** ou **`yarn test`**
    *   Executa os testes utilizando Jest.

*   **`npm run coverage`** ou **`yarn coverage`**
    *   Executa os testes e gera relatório de cobertura.

*   **`npm run sonar`** ou **`yarn sonar`**
    *   Executa a análise de código com SonarQube Scanner.

## Estrutura do Projeto (Principais Pastas)

*   **`app/`**: Contém todas as rotas, componentes e lógica da aplicação (usando o App Router do Next.js).
    *   `app/login/`: Tela de login.
    *   `app/(auth)/`: Layout e páginas para usuários autenticados.
        *   `app/(auth)/domains/`: CRUD de Domínios.
            *   `app/(auth)/domains/page.tsx`: Página principal de listagem
            *   `app/(auth)/domains/[id]/page.tsx`: Página de detalhes do domínio
            *   `app/(auth)/domains/components/`: Componentes específicos
                *   `DomainForm.tsx`: Formulário de criação/edição
                *   `DomainList.tsx`: Lista de domínios
                *   `DomainModal.tsx`: Modal para operações CRUD
                *   `PokemonTable.tsx`: Tabela de domínios com paginação
        *   `app/(auth)/domainsItems/`: Gerenciamento de Itens de Domínios.
            *   `app/(auth)/domainsItems/page.tsx`: Página principal de listagem
            *   `app/(auth)/domainsItems/[id]/page.tsx`: Página de detalhes do item
            *   `app/(auth)/domainsItems/components/`: Componentes específicos
                *   `DomainItemForm.tsx`: Formulário de criação/edição
                *   `DomainItemList.tsx`: Lista de itens
                *   `DomainItemModal.tsx`: Modal para operações CRUD
*   **`lib/`**: 
    *   Módulos auxiliares
    *   Cliente API (`apiClient.ts`)
    *   Provedores (ex: `QueryProvider.tsx`, `ReduxProvider.tsx`)
    *   Configuração do Keycloak
*   **`services/`**: 
    *   Funções para interagir com a API backend
    *   Serviços de autenticação
    *   Serviços de domínios e itens de domínios
*   **`store/`**: 
    *   Configuração do Redux
    *   Slices e reducers
*   **`styles/`**: 
    *   Arquivos de estilo globais
    *   Variáveis SASS
    *   Temas do Material-UI
*   **`types/`**: 
    *   Definições de tipos TypeScript
    *   Interfaces da API
    *   Tipos para domínios e itens de domínios
*   **`__tests__/`**: 
    *   Testes unitários e de integração
    *   Mocks e fixtures
    *   Testes para domínios e itens de domínios

## Contribuição

Por favor, siga as diretrizes de contribuição do projeto (se houver).

