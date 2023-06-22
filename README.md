<p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIAOtqQ5is5vwbcEn0ZahZfMxz1QIeAYtFfnLdkCXu1sqAGbnX" width="300">
 </p>

## Desafio Front-End.
Este desafio foi realizado para a vaga de desenvolvedor front-end da Oliveira Trust.

Meu objetivo foi demonstrar meu conhecimento e minha experiencia com programação, o desafio foi realizado utilizando o framework ReactJs aplicando Typescript, junto com outras bibliotecas e módulos listados ao decorrer do documento.

## Modulos e bibliotecas utilizadas
* [axios](https://www.npmjs.com/package/axios) -  Usado para fazer as integrações com as apis.
* [tailwindcss](https://tailwindcss.com/) - Utilizei esta biblioteca para agilizar a estilização dos componentes, a utilização dessa biblioteca junto com sua extensão no Vscode permite um entendimento rápido e de fácil de suas classes.
* [react-hook-forms](https://www.react-hook-form.com/) e [zod](https://zod.dev/) - React hook forms foi utilizado para gerenciar nossos formulários, e o zod para validar e trazer uma tipagem para os nossos formulários.  
* [currencyJs](https://currency.js.org/) e [input-currency-react](https://www.npmjs.com/package/input-currency-react) -  Bibliotecas utilizadas para a formatação e transformação dos inputs de dinheiro.
* [json2csv](https://juanjodiaz.github.io/json2csv/#/) - Utilizada na exportação de dados da lista.

## Solução do desafio
Entendi do desafio que precisava implementar uma tela de gerenciamento de carteiras dos usuários. que consistia em uma lista carteiras com um conjunto de filtros e que precisava ser paginada. Também era permitido que o usuário pudesse adicionar, editar e remover uma carteira, junto com a possibilidade de exportar a lista filtrada como um arquivo .csv.

Utilizei typescript para auxiliar na organização e na manutenção dos componentes criados.

O gerenciamento de estados da aplicação foi realizado através do [Provider Pattern](https://www.patterns.dev/posts/provider-pattern) com a utilização da [Context API](https://legacy.reactjs.org/docs/context.html) do react, tornando os estados acessíveis globalmente dentro dos seus devidos contextos.

Os componentes foram construídos pensando em sua autonomia, para que pudessem ser utilizados em outros contextos de aplicação. Componentes como Modal e Toasts foram desenvolvidos utilizando [Compound Components Pattern](https://blog.logrocket.com/understanding-react-compound-components/#:~:text=Compound%20components%20are%20a%20pattern,they%20are%20called%20compound%20components.) tornando seu acesso global em todos os níveis aplicação.

## Como iniciar o projeto

Recomendado a versão **14.16.0** do NodeJs.

É necessário possuir a biblioteca json-server instalada em sua máquina:

```
npm install -g json-server
```
Também será necessário instalar as dependências do projeto executando:

```
npm install
```

Finalmente podemos rodar o projeto e a API utilizando apenas um comando:

```
npm start
```

A api a ser consumida está rodando no endereço:

```
http://localhost:3004/users
```

e a aplicação em ReactJs no endereço:

```
http://localhost:3000/
```

