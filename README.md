# Projeto MyReads

Esse é o meu primeiro projeto do curso nanodegree react da Udacity. A idéia do projeto é dispor de uma aplicação com uma prateleira de livros com diferentes status (Lendo, Lido e Gostaria de ler). Além disso é possível mudar o status desses livros, e claro, procurar e incluir novos livos nessas prateleiras. Para a criação desse projeto usamos [Create React App](https://github.com/facebookincubator/create-react-app). Também usei a lib [react-fontawesome](https://www.npmjs.com/package/react-fontawesome) e o componente [react-debounce-input](https://www.npmjs.com/package/react-debounce-input).

## Para conseguir rodar o projeto

O primeiro passo é instalar todas as dependências do projeto:
* com o comando: `npm install`

E em seguida executar o projeto:
* com o comando: `npm start`

## Backend Server

Para simplificar e agilizar o processo de criação do projeto, o server backend foi fornecido no arquivo [`BooksAPI.js`](src/BooksAPI.js) com os seguintes métodos:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Assinatura do método:

```js
getAll()
```

* Retorna uma Promise que resulta em um objeto JSON contendo uma coleção de objetos book.
* Essa coleção representa os livros atuais na prateleira de livros do app.

### `update`

Assinatura do método:

```js
update(book, shelf)
```

* book: `<Object>` contém no mínimo o atributo `id`
* shelf: `<String>` contém um dos ["wantToRead", "currentlyReading", "read"]
* Retorna uma Promise que resulta em um objeto JSON contendo o retorno do POST request.

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Retorna uma Promise que resulta em um objeto JSON contendo uma coleção de objetos book com no máximo 20 itens.
* Esses livros não vêm com a prateleira em que se encontram, isso foi preciso ser implementado.

## Importante
A API de backend usa um conjunto fixo de resultados de busca e limitados a um conjunto particular de termos, que podem ser encontrado em [SEARCH_TERMS.md](SEARCH_TERMS.md). São os únicos termos que irão funcionar na pesquisa, então não fique surpreso se procurar por algo diferente e não encontrar um resultado.

## Create React App

Esse projeto como dito, foi iniciado com [Create React App](https://github.com/facebookincubator/create-react-app).

## Extra

Como um extra ao projeto, adicionei uma funcionalidade que permite o usuário arrastar livros de uma prateleira para outra. Essa funcionalidade está presente apenas para desktop, mas ainda assimé um extra :)
