const { dynamoDB } = require("./factory");
const Handler = require('./handler')

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

module.exports.heroesInsert = async (event) => {
  return handler.main(event)
};
