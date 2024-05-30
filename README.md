# Projeto Vue.js com Vuex e JSON-Server

## Descrição do Projeto

Este projeto é uma aplicação de gerenciamento de usuários de Bitcoin construída com Vue.js (versão 2), Vuex para gerenciamento de estado, e JSON-Server para simular uma API REST, xlxs para exportação em CSV, Axios para requisições. A aplicação permite a visualização, criação, edição e exclusão de usuários, bem como a exportação dos dados para CSV.

## Configuração e Execução do Projeto

### Pré-requisitos

Certifique-se de ter o Node.js e npm instalados em sua máquina.

Troque a versão do Node para 16:
``` bash
    nvm install 16
    nvm use 16
```

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/alvesxdani/desafio-frontend-oliveira-trust
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd desafio-frontend-oliveira-trust
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Execução do Projeto

1. Inicie a aplicação Vue.js:
   ```bash
   npm start
   ```
3. Abra o navegador e acesse `http://localhost:8080`.

## Detalhes da Implementação

### Vuex Store

O Vuex é utilizado para gerenciar o estado da aplicação. A estrutura do módulo `users` inclui:

- **State:** Armazena a lista de usuários.
- **Getters:** Retorna a lista de todos os usuários.
- **Actions:** Métodos assíncronos para buscar, criar, deletar e atualizar usuários através da API do JSON-Server.
- **Mutations:** Métodos síncronos para atualizar o estado da store.

### Componente `Tabela`

O componente `Tabela` exibe a lista de usuários em uma tabela e permite a paginação, edição e exclusão de usuários. Também possui a funcionalidade de exportar os dados para CSV.

#### Paginação

A paginação é implementada com base no número total de usuários e o número de usuários exibidos por página. **Sem realizar a renderização com fetch.**

#### Exportação para CSV

A exportação para CSV utiliza a biblioteca `SheetJS (xlsx)` para converter os dados da tabela em um arquivo CSV e permite o download do arquivo.

### Componente `FormularioFiltro`

O componente `FormularioFiltro` permite filtrar a lista de usuários por nome, sobrenome e email. Os valores dos campos são gerenciados por meio de propriedades (`props`) e o estado local do componente.

## Estilos

Os estilos CSS são organizados em arquivos separados e importados nos componentes conforme necessário.
