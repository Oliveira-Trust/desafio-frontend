# Desafio Frontend Oliveira Trust

Esse é o desafio proposto pela Oliveira Trust para implementar esse [protótipo fornecido](https://www.figma.com/proto/AO265OINopUSibxX8Dd4A6/Desafio-Front-End?page-id=0%3A1&node-id=2%3A362&viewport=314%2C48%2C0.15&scaling=contain&starting-point-node-id=2%3A362).

## Tecnologias utilizadas

- Typescript 5.4.5;
- Node 20 (LTS);
- Vue 3;
- Tailwind;
- Pinia (Gerenciamento de estado);
- Vercel (CI/CD).
- Vitest (Testes unitários);

Utilizei o Vercel para hospedar o desafio e criei o ciclo de CI/CD, cada merge ou commit na branch `matheus-andrade-tavares` faz um deploy automático para o Vercel, a API com json-server também foi hospedada usando o vercel, em projetos diferentes:

- Frontend: https://desafio-frontend-alpha.vercel.app/
- API json-server: https://desafio-frontend-server.vercel.app/users

## Requisitos

- Node v20 (LTS)
- json-server v0.17.4

É necessário a versão `v0.17.4` do json-server para utilizar o `_like` nas query params ([ref](https://github.com/typicode/json-server/issues/1509))

```
npm install -g json-server@0.17.4
```

## Rodando o projeto localmente

Crie o arquivo .env copiando o arquivo .env.example:

```
cp .env.example .env
```

Instale as dependências:

```
npm install
```

Para rodar a API e a aplicação, rode o seguinte comando:

```
npm start
```

A API rodará no endereço:

```
http://localhost:3004/users
```

A aplicação rodará no endereço:

```
http://localhost:5173/
```

---

Caso queira utilizar a API hospedada via Vercel, primeiro copie o env de produção:

```
cp .env.production .env
```

Depois, rode somente a aplicação

```
npm run dev
```

A aplicação rodará no mesmo endereço:

```
http://localhost:5173/
```

## Considerações finais

Gostaria de agradecer a oportunidade de realizar esse desafio, aprendi muito e gostei bastante do resultado, espero que gostem também!
