'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "votes",
        Select: "ALL_ATTRIBUTES"
    }

    let responseBody = "";
    let statusCode = 0;

    try {

        const data = await documentClient.scan(params).promise();

        responseBody = JSON.stringify(data);
        statusCode = 201;

        documentClient

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
