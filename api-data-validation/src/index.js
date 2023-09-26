const { dynamoDB } = require("./factory");
const { decoratorValidator } = require("./util");
const Handler = require('./handler');

const handler = new Handler({
  dynamoDBSvc: dynamoDB
})

module.exports.heroesTrigger = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
}; 

module.exports.heroesInsert = decoratorValidator(
  handler.main.bind(handler), // .bind para garantir que a variável this seja o conteúdo do handler
  handler.validator(),
  'body'
)
