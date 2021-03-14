import AWS from 'aws-sdk';
import {
  DeleteItemInput,
  GetItemInput,
  PutItemInput,
  QueryInput,
  UpdateItemInput,
} from 'aws-sdk/clients/dynamodb';

export const attributes =
  'id, step, #name, email, address, age, notes, createdAt, updatedAt';
export const attributeNames = {
  '#name': 'name',
};

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const get = async (params: GetItemInput) =>
  await dynamoDB.scan(params).promise();

export const put = async (params: PutItemInput) =>
  await dynamoDB.put(params).promise();

export const update = async (params: UpdateItemInput) =>
  await dynamoDB.update(params).promise();

export const query = async (params: QueryInput) =>
  await dynamoDB
    .query({
      ...params,
      ExpressionAttributeNames: attributeNames,
      ProjectionExpression: attributes,
    })
    .promise();

export const remove = async (params: DeleteItemInput) =>
  await dynamoDB.delete(params).promise();
