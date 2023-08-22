import http from "node:http";
import { json } from "./middlewares/json.js"; 
import { routes } from "./route.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req, res) // após chamar o json, o objeto req, vai ter recebido o aprametro body
  
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route){
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {}; // operador condicional ternário
    // Se query for avaliado como verdadeiro (ou seja, não é nulo, vazio ou avaliado como falso em um contexto booleano), a função extractQueryParams(query) será chamada.
    // Se query for avaliado como falso (ou seja, é nulo, vazio ou avaliado como falso em um contexto booleano), um objeto vazio {} será atribuído a req.query.
    req.params = { ...routeParams.groups };
    //Está criando uma cópia independente do objeto routeParams.group usando o operador de propagação (...).
    // Isso é feito para garantir que as modificações feitas em params não afetem o objeto original routeParams.group

    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not Found");
})

server.listen(3335)
console.log("Servidor Rodando")