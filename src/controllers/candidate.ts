import { Context } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { errorResponse, response } from '../utils';
import { db } from '../aws';
import {
  DeleteItemInput,
  GetItemInput,
  PutItemInput,
  QueryInput,
} from 'aws-sdk/clients/dynamodb';

const TableName = 'Candidate';

export class CandidateController {
  async get(ctx: Context) {
    try {
      const params = {
        TableName,
      };

      const { Items: items } = await db.get(params as GetItemInput);

      return response(ctx, StatusCodes.OK, items);
    } catch (error) {
      return errorResponse(ctx, error.statusCode);
    }
  }
  async getById(ctx: Context, id: string) {
    try {
      const params = {
        TableName,
        KeyConditionExpression: 'pk = :id',
        ExpressionAttributeValues: {
          ':id': id,
        },
      };

      const { Items: items } = await db.query(params as QueryInput);

      return response(ctx, StatusCodes.OK, items[0]);
    } catch (error) {
      return errorResponse(ctx, error.statusCode);
    }
  }

  async create(ctx: Context, body: Event) {
    try {
      const id = uuidv4();
      const params = {
        TableName,
        Item: {
          pk: id,
          sk: 'meta',
          gsi1pk: 'meta',
          id,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...body,
        },
      };

      await db.put(params as PutItemInput);

      return response(ctx, StatusCodes.OK, { ...body, id });
    } catch (error) {
      return errorResponse(ctx, error.statusCode);
    }
  }

  async update(ctx: Context, id: string, body: Event) {
    try {
      const params = {
        TableName,
        Item: {
          pk: id,
          sk: 'meta',
          ...body,
          updatedAt: Date.now(),
        },
      };

      await db.put(params as PutItemInput);

      return response(ctx, StatusCodes.OK, body);
    } catch (error) {
      return errorResponse(ctx, error.statusCode);
    }
  }

  async delete(ctx: Context, id: string) {
    try {
      const params = {
        TableName,
        Key: {
          pk: id,
          sk: 'meta',
        },
      };

      await db.remove(params as DeleteItemInput);

      return response(ctx, StatusCodes.OK);
    } catch (error) {
      return errorResponse(ctx, error.statusCode);
    }
  }
}
