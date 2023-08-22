// /tasks/:id/complete
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g //o/g significa q é uma regex global
  const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)")

  //toda regex tem um método chamado test que retorna true ou false

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  return pathRegex

}