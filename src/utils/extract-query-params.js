// ?search=uriel&page=2

export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split("=")
    queryParams[key] = value
    return queryParams
  }, {})
}

/*
.substr(1) é usado para criar uma nova string que começa a partir do segundo caractere (índice 1)
da string query. Isso é feito para remover o primeiro caractere, 
que normalmente seria um caractere de ponto de interrogação (?), utilizado para iniciar os parâmetros 
de uma URL.
*/