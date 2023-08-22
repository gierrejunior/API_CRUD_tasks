import http from "node:http";
import { json } from "./middlewares/json.js"; 
import { routes } from "./route.js";
import { log } from "node:console";

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req, res) // após chamar o json, o objeto req, vai ter recebido o aprametro body
  
  
  const route = routes.find(route => {
    console.log(route.method === method);
    console.log(route.path.test(url));
    console.log(" ");
    return route.method === method && route.path.test(url)
  })

  if (route){
    const routeParams = req.url.match(route.path)
    const {...params } = routeParams.groups
    req.params = params

    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not Found");
})

server.listen(3335)
console.log("Servidor Rodando")