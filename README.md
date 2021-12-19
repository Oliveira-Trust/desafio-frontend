<p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIAOtqQ5is5vwbcEn0ZahZfMxz1QIeAYtFfnLdkCXu1sqAGbnX" width="300">
 </p>

## Sobre o desafio para candidatos à vaga de Desenvolvedor Front End (Jr/Pleno/Sênior).
Olá avaliador ou curioso, este é o desafio foi montado para a vaga de Desenvolvedor Front-End 
Pleno da Oliveira Trust.  

Meu objetivo é demonstrar meus conhecimentos em lógica de programação mostrando domínio e experiência, usando o framework VUE junto com as suas bibliotecas internas e libs do NODE.JS, com uma boa escrita de código limpa e escalável, utilizando javascript para resolver o desafio.

## Módulos e Bibliotecas usadas

Para entregar uma solução para o desafio foram usadas as seguintes bibliotecas:

- [x] [axios](https://www.npmjs.com/package/axios) - Usado para fazer as integrações com as apis nescessárias.

- [x] [scss](https://www.npmjs.com/package/scss-loader) e [tailwindcss](https://tailwindcss.com/) - Optei por usar essa biblioteca css junto com o scss para deixar o código mais limpo e facilitar na escrita de flexbox, deixando o projeto responsível para mais resoluções de telas.

- [x] [vuex](https://www.npmjs.com/package/vuex) e [vue-cookies](https://www.npmjs.com/package/vue-cookies) - VUEX é um [gerenciador de estado](https://medium.com/android-dev-moz/gerenciamento-de-estado-introdu%C3%A7%C3%A3o-5854e85f50e9) e para deixar nossa aplicação persistente, vamos usar o gerenciador de cookies do VUE, o [VUE COOKIES](https://www.npmjs.com/package/vue-cookies)

- [X] [vue-router](https://www.npmjs.com/package/vue-router) - Usado para gerenciar as rotas do desafio. 

- [X] [export-to-csv](https://www.npmjs.com/package/export-to-csv) - Usado para exportar de forma prática csv da lista de Usuários.

- [X] [V-Money](https://www.npmjs.com/package/v-money) - Biblioteca de formatação de dinheiro dentro de um input

## Solução do Problema

O Desafio foi interpretado como uma Dashboard de usuário, que no caso, consiste em um conjunto de filtros, uma ação de adicionar uma Carteira, exportar os dados do usuário em um csv, e uma tabela exibindo alguns dados dos usuários com duas ações: Deletar e Editar um usuário.

Para montar a página, foi usado a arquitetura [Flux](https://medium.com/engenharia-arquivei/arquitetura-flux-26a419871ade) junto com o padrão de componentes [Atomic Design](https://brasil.uxdesign.cc/atomic-design-redesenhando-os-entreg%C3%A1veis-de-designers-e-desenvolvedores-da8886c7258d).

Os principais componentes de interação que são: Modal, button, input e notification, foram construídos do zero, com funcionalidades que ajudam nas validações, coom ações que deixam os componentes mais autônomo e menos dependendtes de ações dos componentes pai.

Um template "defout" foi montado para escalabilidade do projeto, junto com o uso das rotas com o vue-router.

Seguindo o padrão Atomic Design, a dashboard foi montada e alguns recursos de flexibilidade da tela foi usado. Porém, o acesso mobile dela não é dos
mais agradáveis devido ao componente de tabela, que não foi ajustado para uma tela mobile.

Os recursos de usuários e a sua listagem como suas ações foram alocados em um gerenciador de estado, junto com o componente de notificação. A Notificação foi para o gerenciador de estado para ser um utilitário mais limpo ao código, dando mais praticidade na hora de dar um feedback ao usuário.



## Configurações do projeto

É necessário possuir a biblioteca json-server instalada em sua máquina:

```
npm install -g json-server
```
Acesse a [documentação](https://github.com/typicode/json-server#getting-started) do json-server para entender melhor como manipular a API.

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

e a aplicação em Vue.Js no endereço:

```
http://localhost:8080/
```


