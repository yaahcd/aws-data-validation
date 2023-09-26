const { dynamoDB } = require("./factory");
const { randomUUID } = require("node:crypto");

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

  const data = JSON.parse(event.body);
  const params = {
    TableName: "Heroes",
    Item: {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    },
  };

  await dynamoDB.put(params).promise();

  const insertedItem = await dynamoDB
    .query({
      TableName: "Heroes",
      ExpressionAttributeValues: {
        ":id": params.Item.id,
      },
      KeyConditionExpression: "id = :id",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(insertedItem),
  };
};
