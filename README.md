<p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIAOtqQ5is5vwbcEn0ZahZfMxz1QIeAYtFfnLdkCXu1sqAGbnX" width="300">
 </p>

## Desafio Front-End.
Este desafio foi realizado para a vaga de desenvolvedor front-end da Oliveira Trust.

Meu objetivo foi demonstrar meu conhecimento e minha experiencia com programação, o desafio foi realizado utilizando o framework ReactJs aplicando Typescript, junto com outras bibliotecas e modulos listados ao decorrer do documento.

## Modulos e bibliotecas utilizadas
* [axios](https://www.npmjs.com/package/axios) -  Usado para fazer as integrações com as apis.
* [tailwindcss](https://tailwindcss.com/) - Utilizei esta biblioteca para agilizar a estilização dos componentes, a utilização dessa biblioteca junto com sua extensão no Vscode permite um entendimento rapido e de facil de suas classes 
* [react-hook-forms](https://www.react-hook-form.com/) e [zod](https://zod.dev/) - React hook forms foi utilziado para gerenciar nossos formularios, para validar e trazer uma tipagem para os nossos formularios.   
* [currencyJs](https://currency.js.org/) e [input-currency-react](https://www.npmjs.com/package/input-currency-react) -  bibliotecas utilizadas para a formatação e transformação dos inputs de dinheiro.
* [json2csv](https://juanjodiaz.github.io/json2csv/#/) - Utilizada na exportação de dados da lista.

## Solução do desafio
Entendi do desafio que precisave implementar uma tela de gerenciamento de carteiras dos usuarios. que consistia em uma lista carteiras com um conjunto de filtros e que precisava ser paginada. Também era permitido que o usuario pudesse adicionar, editar e remover uma carteira, junto com a possibilidade de exportar a lista filtrada como um arquivo .csv.

Para gerenciar os estados da aplicação a principal ferramenta utilizada foram os [hooks]() disponibilizados pelo reactJs, o principal utilizado foi o "[useContext]()" permitindo componenentes mais autonomos e menos dependentes.

Utilizei typescript para auxiliar na organização e na manutenção dos componenentes criados.

Os componentes foram construidos pensando em sua autonomia e

Com exceção de alguns componentes centrados na estrutura do sistema, os outros componentes foram construidos pensando 
  
## Como iniciar o projeto

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

