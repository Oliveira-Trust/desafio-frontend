# Table of contents

- [O que será avaliado](#o-que-ser-avaliado)
  - [Legibilidade do código](#legibilidade)
  - [Percepção da identidade do produto](#identidade)
  - [Modularização](#modulo)
  - [Lógica para aplicar a regra de negócio](#negocio)
  - [Implementação das APIs](#apis)
- [Bônus](#bonus)
  - [Validação](#validacao)
  - [Gerenciamento de estado](#gerenciamento-de-estado)
  - [Exportação de CSV](#csv)
- [Decisões técnicas](#tec)
  - [UI independente de framework](#ui-independente-de-framework)
  - [Arquitetura clean](#arquitetura-clean)
  - [Conversão de moedas](#moeda)
  - [Estilos CSS](#estilos-css)

<a id="o-que-ser-avaliado"></a>
# 1 - O que será avaliado

Baseado no que foi proposto para avaliação, segue abaixo as minhas considerações sobre o desafio
 
<a id="legibilidade"></a>
- ## Legibilidade do código

Eu tentei manter o mesmo padrão de nomenclatura para variaveis, arquivos e funções. Usei o idioma ingles no código, exceto pelas classes de dominio por não saber qual a melhor tradução dos termos. Também tentei respeitar os principios do solid na arquitetura conforme será explicado adiante.

<a id="identidade"></a>
- ## Percepção da identidade do produto

Utilizei o framewokr de UI vuetify para produzir a interface mais fiel ao protótipo proposto no figma, embora não tenha tido acesso a fontes, metricas de espaçamento e  codigos de cores, fiz o máximo que pude para manter o resultado final fiel ao que foi prototipado.

<a id="modulo"></a>
- ## Modularização

Usei os conceitos da arquitetura limpa (clean archtecture) para tentar separar as responsabilidades e organizar o código, porém sem uma linguagem tipada algumas estrategias envolvendo segregação de interfaces, inversão de controle e injeção de dependencia ficam um pouco comprometidos.

<a id="negocio"></a>
- ## Lógica para aplicar a regra de negócio

Tentei usar recursos mais comuns do javascript e manter uma complexidade ciclomática baixa nas funções, pensando em facilitar um eventual esforço de testes unitários e integrados.

<a id="apis"></a>
- ## Implementação das APIs

Centralizei a logica de acesso a API de usuário e conversão de moeda em 2 arquivos distintos reaproveitáveis para facilitar a manutenção e evitar repetição de codigo.

<a id="bonus"></a>
# 2 - Bônus

No desafio foram propostos 3 requisitos não obrigatórios que seriam considerados como diferencial.

<a id="validacao"></a>
- ## Validação

As regras de validação foram separadas em um arquivo desacoplado do front-end para reaproveitamento e evitar acúmulo de responsabilidade no vue. Com o framewokr de UI vuetify pude validar os inputs em tempo real (onChange) e também no envio dos formulários (onSubmit), além de sinalizar ao usuário os erros.

- ## Gerenciamento de estado

Seguindo o proposto no desafio utilizei o Vuex para centralizar as requisições REST e o controle de estado. Porém eu perefiro usar o Pinia, que é na verdade o novo gerenciador de estado oficial do vue, uma vez que o vuex será descontinuado. Não utilizei modulos na store por achar o desafio pequeno para isso.

<a id="csv"></a>
- ## Exportação de CSV

Eu não usei nenhuma biblioteca, mas criei um arquivo utilitário para manipulação de arquivos onde coloquei a lógica de conversão de Json para CSV e para download. Como adicional, fiz a exportação respeitar o filtro aplicado na grid, sendo assim possível ter várias visualizações distintas.

<a id="tec"></a>
# 3 - Decisões técnicas

Segue abaixo algumas explicações técnicas sobre as decisões que tomei no desafio sobre assuntos que podem causar alguma reflexão ou mal entendio.

- ## UI independente de framework

O arquivo "main.js" na camada de apresentação contem apenas uma chamada para uma função boostrap responsavel por levantar o front.

Essa estratégia permite a troca de vue por react, bastando criar uma função de boostrapReact por exemplo. Essa estrategia depende de um trabalho de separação de responsabilidades entre as camadas do projeto, o que é uma boa pratica.  

```
import { bootstrapVue } from './presentation/bootstrap'  
bootstrapVue('#app')
```

- ## Arquitetura clean

O projeto foi orgaizado baseado na proposta de Robert C. Martin (Uncle BOB) em Clean Archtecture. Respeitando as limitações do Javascript, tentei manter o código menos acoplado tornando viável a mudança de bibliotecas (ex:axios pra fetch) ou frameworks (ex: vue pra react) e o reaproveitamento de codigos em futuros projetos e outras camadas de apresentação (ex: mobile, dashboards etc).

- ### Assets
	Contém recursos estáticos, como imagens, videos e fontes.

- ### Domain
	Contém a lógica de negócios dos casos de uso e modelos das classes de negócio.

- ### Infrastructure
	Contém a lógica de acesso a dados, adaptadores de serviços externos e implementação de protocolos (http, smtp etc).

- ### Presentation
	Contém os componentes da camada de apresentação, como componentes Vue, rotas e a interface de usuário.

- ### Services
	Contém os serviços utilitários para a camada de negócios, como validação, exportação de relatorios, e outros recursos.

  
<a id="moeda"></a>
- ## Conversão de moedas

Para facilitar a conferência desse requisito eu coloquei uma coluna adicional na tabela, exibindo o valor da carteira em BTC e na outra moeda selecionada. Uma lista de 4 moedas foi adicionada arbitrariamente e você pode escolher BTC nas duas colunas para fins de comparação. Em um projeto de produção real eu deixaria apenas a coluna com o valor convertido.

  

- ## Estilos CSS

Como utilizei o vuetify precisei sobrescrever o css dele para respeitar o prototipo do desafio. Separei as variaveis do SCSS em um arquivo e criei outro para sobrescrever o tema padrão do vuetify.
