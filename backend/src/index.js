const express = require('express'); // importa o express e salva na variável express
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Métodos HTTP::
 * 
 * GET    -> Buscar uma informações do back-end
 * 		Retorna uma rota para o front-end
 * 		app.get('/users', ...) -> Acessar a aba de usuários
 * 
 * POST   -> Criar uma informação no back-end
 * 		Cria uma rota no front-end
 * 		app.post('/users/joao', ...) -> Cadastra um usuário joao no servidor
 * 
 * PUT    -> Alterar uma informação no back-end
 * DELETE -> Deleta uma informação no back-end
 */


/**
 * Tipos de parâmetros::
 * 
 * Query Parms -> Parâmetros nomeados enviados na rota após "?"
 * 		Filtros, Paginação
 * 		http://localhost:3333/users?name=Douglas&page=2
 * 
 * Route Parms -> Parâmtreos utilizados para identificar recursos
 * 		http://localhost:3333/users/1 [app.get('/users/:id')]
 * 
 * Request Body -> Corpo da requisição. Usado para criar ou alterar recursos
 */

app.listen(3333);