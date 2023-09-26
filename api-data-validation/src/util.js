//fn = main
//schema é a validação
// argtype = body, queryString

const decoratorValidator = (fn, schema, argType) => {
  return async function (event) {
    const data = JSON.parse(event[argType]);
    const { error, value } = schema.validate(data, {
      //mostra erros na tela
      abortEarly: false,
    });

    event[argType] = value;
    //o argumento que é passado não é o mesmo do começo da função pois ele está sendo alterado na linha 13
    if (!error) return fn.apply(this, arguments);

    return {
      statusCode: 422, //aws = unprocessable entity
      body: error.message,
    };
  };
};

module.exports = {
  decoratorValidator,
};
