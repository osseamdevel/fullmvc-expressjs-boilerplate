exports.middlewareGlobal = (request, response, next) => {
  response.locals.umaVariavelLocal = 'Este é o valor da variável local.';
  next();
};

exports.csrfErrorHandler = (error, request, response, next) => {
  if (error.code === 'EBADCSRFTOKEN') {
    return response.status(403).render('404', { message: 'Erro CSRF detectado!' });
  } else {
    return response.status(500).render('404', { message: 'Erro interno do servidor' });
  }
};

exports.checkCsrf = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  next();
};
