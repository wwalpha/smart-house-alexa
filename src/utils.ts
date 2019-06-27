import { DynamoDB } from 'aws-sdk';
import moment from 'moment';

const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

const TABLE_STATUS = process.env.TABLE_STATUS as string;
const TABLE_DEVICES = process.env.TABLE_DEVICES as string;

export const discover = async () => await client.scan({ TableName: TABLE_DEVICES }).promise();

export const getStatus = async (endpointId: string) =>
  await client
    .get({
      TableName: TABLE_STATUS,
      Key: {
        endpointId: endpointId,
      },
    })
    .promise();

export const putStatus = async (endpointId: string, properties: any[]) =>
  await client
    .put({
      TableName: TABLE_STATUS,
      Item: {
        endpointId,
        properties,
      },
    })
    .promise();

export const getUTC = () =>
  moment()
    .utc()
    .format();
