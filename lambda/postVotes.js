'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    
    const {lang} = event.pathParameters
    
    // let lang = "Python"

    try {

      const newParams = {
        TableName: "votes",
        Key: {
          lang: lang
        },
        ExpressionAttributeValues: {
          ":increase": 1
        },
        UpdateExpression: 'ADD cnt :increase',
        ReturnValues: "UPDATED_NEW"
      };
        
        const data = await documentClient.update(newParams).promise();
        // responseBody = JSON.stringify(data);
        statusCode = 201;

    } catch (err) {
        responseBody = err.message
        statusCode = 403;
    }

    const responseObject = {
        statusCode: statusCode,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: responseBody
    }

    return responseObject;
}
