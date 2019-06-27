import { PowerControllerRequest, PowerControllerResponse } from 'typings/alexa';
import { IotData } from 'aws-sdk';

const IOT_ENDPOINT = process.env.IOT_ENDPOINT as string;
const IOT_REGION = process.env.IOT_REGION as string;

export default async ({ directive: { header, payload, endpoint } }: PowerControllerRequest): Promise<PowerControllerResponse> => {
  const client = new IotData({
    region: IOT_REGION,
    endpoint: IOT_ENDPOINT,
  });

  await client
    .publish({
      topic: `iot/power/${header.name.toLowerCase()}`,
      qos: 0,
      payload: JSON.stringify({
        name: header.name,
      }),
    })
    .promise();

  return {
    event: {
      header: {
        namespace: 'Alexa',
        name: 'Response',
        messageId: header.messageId,
        payloadVersion: '3',
        correlationToken: header.correlationToken,
      },
      endpoint,
      payload,
    },
    context: {
      properties: [
        {
          namespace: 'Alexa.PowerController',
          name: 'powerState',
          timeOfSample: '2017-02-03T16:20:50.52Z',
          value: header.name === 'TurnOn' ? 'ON' : 'OFF',
          uncertaintyInMilliseconds: 1000,
        },
      ],
    },
  };
};
