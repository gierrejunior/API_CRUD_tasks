export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) { // para cada chunk da requisição
    buffers.push(chunk) // adiciona o chunk no array buffer
  }

  try { 
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch { 
        req.body = null 
    }
  res.setHeader("Content-type", "application/json")  // seta o responser como json
}


/*
req.body: Aqui, está-se presumindo que req é um objeto que representa uma requisição HTTP 
  (por exemplo, em um servidor Node.js usando Express.js). O código está adicionando uma propriedade 
  chamada body a esse objeto, que normalmente é usada para armazenar os dados do corpo da requisição.

Buffer.concat(buffers): Aqui, buffers é um array de buffers. Um buffer é uma estrutura de dados 
  usada para trabalhar com dados binários (geralmente bytes) de maneira eficiente. O Buffer.concat() 
  é usado para concatenar esses buffers em um único buffer.

.toString(): Após a concatenação dos buffers, o método .toString() é chamado para converter o buffer
  resultante em uma string. Isso é necessário porque a função JSON.parse() espera uma string como entrada.

JSON.parse(...): O método JSON.parse() é usado para analisar uma string JSON e convertê-la em um
  objeto JavaScript. Nesse contexto, a string resultante da concatenação e conversão dos buffers é
    interpretada como uma representação JSON válida.

Portanto, o código realiza as seguintes etapas:

1-Concatena os buffers no array buffers em um único buffer.
2-Converte o buffer resultante em uma string.
3-Analisa a string como JSON e a converte em um objeto JavaScript.
4-Atribui o objeto resultante à propriedade body do objeto req.

Isso é frequentemente usado em servidores para lidar com requisições que contêm dados JSON no corpo 
da requisição. O código acima está processando esses dados e colocando-os no objeto req.body para que possam 
ser acessados posteriormente no tratamento da requisição.
*/