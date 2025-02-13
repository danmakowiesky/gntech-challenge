# GNTech Challenge

Este é o repositório para o desafio técnico da GNTech, onde o objetivo principal foi integrar a extração de dados de uma API pública, armazenamento em banco de dados relacional, criação de uma API simples para consultar os dados, e a utilização do Docker para conteinerização. O desafio foi implementado utilizando a API do IMDb via RapidAPI para a extração de dados, com um backend em Node.js, armazenamento no banco de dados PostgreSQL e uma API RESTful para consulta dos dados.

## Tecnologias Utilizadas

- **Node.js**: Para implementação da API e gerenciamento de rotas.
- **Prisma ORM**: Para integração com o banco de dados PostgreSQL.
- **Express.js**: Para criação da API RESTful.
- **PostgreSQL**: Banco de dados relacional para armazenamento dos filmes.
- **Axios**: Para fazer requisições HTTP para a API externa (IMDb via RapidAPI).
- **Docker**: Para conteinerização do ambiente de desenvolvimento.
- **Zod**: Para validação de dados em endpoints.

## Endpoints da API

### `GET /get-all-movies`

Este endpoint retorna todos os filmes cadastrados no banco de dados.

- **Resposta Sucessiva**:
  - Código: `200 OK`
  - Corpo:
    ```json
    {
    "movies": [
        {
          "url": "https://www.imdb.com/title/tt14513804/",
          "originalTitle": "Captain America: Brave New World",
          "type": "movie",
          "description": "Sam Wilson, the new Captain America, finds himself in the middle of an international incident and must discover the motive behind a nefarious global plan.",
          "startYear": 2025,
          "genre": [
              "Action",
              "Adventure",
              "Sci-Fi"
          ]
        },
        {
          "url": "https://www.imdb.com/title/tt28479262/",
          "originalTitle": "Sing Sing",
          "type": "movie",
          "description": "Divine G, imprisoned at Sing Sing for a crime he didn't commit, finds purpose by acting in a theatre group alongside other incarcerated men in this story of resilience, humanity, and the transformative power of art.",
          "startYear": 2023,
          "genre": [
              "Drama"
          ]
        },
      ]
    }
    ```

  - Caso não haja filmes cadastrados:
    ```json
    {
      "message": "No movies found."
    }
    ```

- **Resposta de erro**:
  - Código: `500 Internal Server Error`
  - Corpo:
    ```json
    {
      "message": "Error fetching movies"
    }
    ```

### `GET /get-movies-from-imdb?countryCode=BR&type=MOVIE`

Este endpoint realiza a busca e armazenamento de filmes na base de dados a partir da API do IMDb via RapidAPI.

- **Parâmetros de Consulta**:
  - `countryCode`: Código do país (ex: "BR").
  - `type`: Tipo de conteúdo, pode ser `MOVIE` ou `TV`.
  
- **Resposta Sucessiva**:
  - Código: `201 Created` quando os filmes são inseridos com sucesso.
  - Código: `200 OK` caso não haja novos filmes para inserir.

    ```json
    {
      "movies": [
          {
              "url": "https://www.imdb.com/title/tt14513804/",
              "originalTitle": "Captain America: Brave New World",
              "type": "movie",
              "description": "Sam Wilson, the new Captain America, finds himself in the middle of an international incident and must discover the motive behind a nefarious global plan.",
              "startYear": 2025,
              "genre": [
                  "Action",
                  "Adventure",
                  "Sci-Fi"
              ]
          },
          {
              "url": "https://www.imdb.com/title/tt28479262/",
              "originalTitle": "Sing Sing",
              "type": "movie",
              "description": "Divine G, imprisoned at Sing Sing for a crime he didn't commit, finds purpose by acting in a theatre group alongside other incarcerated men in this story of resilience, humanity, and the transformative power of art.",
              "startYear": 2023,
              "genre": [
                  "Drama"
              ]
          },
      
      ]
    }
    ```

- **Resposta de erro**:
  - Código: `500 Internal Server Error`
  - Corpo:
    ```json
    {
      "message": "Error fetching movies"
    }
    ```

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Docker** (opcional, mas recomendado)

### Passos para Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/danmakowiesky/gntech-challenge.git

2. Navegue até o diretório do projeto:
   ```bash
   cd gntech-challenge
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```bash
    PORT=
    NODE_ENV=
    DB_HOST=
    DB_NAME=
    DB_PORT=
    DB_USER=
    DB_PASS=
    DATABASE_URL=
    RAPIDAPI_KEY=
    URL_API=
    RAPID_API_HOST=

5.Para rodar o projeto em modo de desenvolvimento, use o seguinte comando:
   ```bash
     npm run dev
   ```

6.Acesse a API em `http://localhost:3000/movies` para ver os filmes cadastrados no banco de dados.




