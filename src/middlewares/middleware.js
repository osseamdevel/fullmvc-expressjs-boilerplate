exports.middlewareGlobal = (request, response, next) => {
  response.locals.umaVariavelLocal = 'Este é o valor da variável local.';
  next();
};

exports.checkCsrf = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  next();
}