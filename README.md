# To-Do List

Este é um projeto de lista de tarefas simples, desenvolvido com HTML, CSS e JavaScript.

## Funcionalidades

- Adicionar novas tarefas
- Marcar tarefas como concluídas
- Remover tarefas
- Salvar tarefas no `localStorage` do navegador
- Carregar tarefas salvas ao recarregar a página
- Obter sugestões de tarefas de uma API externa

## Estrutura do Projeto

- `src/index.html`: Estrutura HTML da aplicação.
- `src/css/style.css`: Estilos CSS para a aplicação.
- `src/js/script.js`: Lógica principal da aplicação.
- `src/js/todo.js`: Funções auxiliares para manipulação de tarefas.
- `src/js/todo.test.js`: Testes unitários para as funções de manipulação de tarefas.
- `config/jest.config.cjs`: Configuração do Jest para testes.
- `config/babel.config.cjs`: Configuração do Babel para transpilar o código.

## Como Executar

1. Instale as dependências:
   ```sh
   npm install

2. Execute os testes:
   ```sh
   npm test

4. rode o comando `http-server src` no seu terminal para ver a aplicação no localhost.
