<p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIAOtqQ5is5vwbcEn0ZahZfMxz1QIeAYtFfnLdkCXu1sqAGbnX" width="300">
 </p>

## Desafio para candidatos à vaga de Desenvolvedor Front End (Jr/Pleno/Sênior).
Olá caro desenvolvedor, nosso principal objetivo é conseguir ver a lógica implementada independente
da sua experiência, framework ou linguagem utilizada para resolver o desafio. Queremos avaliar a sua
capacidade em aplicar as regras de négocios na aplicação, separar as responsabilidades e ter um código
legível para outros desenvolvedores, as instruções nesse projeto são apenas um direcional para entregar
o desafio mas pode ficar livre para resolver da forma que achar mais eficiente. 🚀

Não deixe de enviar o seu teste mesmo que incompleto!

## Tecnologias a serem utilizadas:
* Vuejs (Fornecemos uma estrutura básica do aplicativo) 
* CSS
* HTML

## Entrega:
Para iniciar o teste, faça um fork deste repositório, crie uma branch com o seu nome completo
e depois envie-nos o pull request. 
Se você apenas clonar o repositório não vai conseguir fazer push e depois vai ser mais complicado
fazer o pull request.

Envie também seu LinkedIn ou currículo para vagas@oliveiratrust.com.br.

## O que vamos avaliar:
- Legibilidade do código
- Percepção da identidade do produto
- Modularização
- Lógica para aplicar a regra de negócio
- Implementação das APIs

## Instruções para o desafio:
Você deve implementar um aplicativo feito com Vuejs utilizando uma API de usuários fornecida no próprio projeto e uma API externa de conversão de moedas.

## Obrigatórios:
- Acompanhar identidade visual do [protótipo fornecido](https://www.figma.com/proto/AO265OINopUSibxX8Dd4A6/Desafio-Front-End?page-id=0%3A1&node-id=2%3A362&viewport=314%2C48%2C0.15&scaling=contain&starting-point-node-id=2%3A362)
- Listar os dados da API de usuários em uma tabela
    - Deve conter todos os dados que achar relevante pela API (http://localhost:3004/users)
    - Botões funcionais de editar(modal) e deletar registro p/ cada elemento
- Possibilidade de adicionar novas carteiras através de um modal
- Paginação da listagem (Você pode usar [esquemas](https://github.com/typicode/json-server#paginate) do json-server)
- Adicionar um filtro para listagem (Você pode usar [esquemas](https://github.com/typicode/json-server#full-text-search) do json-server)
- Conversão do saldo Bitcoin (BTC) de cada carteira para moeda escolhida. Ex.: BTC para BRL, USD, etc

Pode utilizar qualquer API para conversão de moedas, mas recomendamos essa aqui: [https://docs.awesomeapi.com.br/api-de-moedas](https://docs.awesomeapi.com.br/api-de-moedas) pela facilidade e boa documentação.

#### Exemplo de conversão da moeda:
- **Parâmetros de entrada**:
    - Moeda de origem: Bitcoin (BTC)
    - Moeda de destino: Real (BRL)
    - Valor para conversão ex.: BTC 0.2242509
- **Parâmetros de saída**:
    - Moeda de origem: Bitcoin (BTC)
    - Moeda de destino: Real (BRL)
    - Valor para conversão ex.: BTC 0.2242509
    - Valor comprado em "Moeda de destino" ex.: R$ 53.054,00
- **Critérios de aceitação**:
    - Ao criar ou editar uma carteira, deve ser possível inserir um valor de compra tendo como resultado o valor que será adquirido na criptomoeda de destino.
    
#### Informações úteis da API de conversão de moedas:
- Conversão BTC para BRL
    - https://economia.awesomeapi.com.br/json/last/BTC-BRL
- Moedas para conversão
    - https://docs.awesomeapi.com.br/api-de-moedas#moedas-com-conversao-para
- Tradução das moedas
    - https://economia.awesomeapi.com.br/json/available/uniq
- Combinações possíveis
    - https://economia.awesomeapi.com.br/json/available
- Legendas
    - https://docs.awesomeapi.com.br/api-de-moedas#legendas
    
## Bônus
- Validação dos inputs para funcionalidade de criar e editar carteira
- Gerenciamento de estado (vuex)
- Exportar dados da lista em CSV (Você pode utlizar alguma biblioteca npm para esta funcionalidade)

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

## Boa sorte! 🚀
