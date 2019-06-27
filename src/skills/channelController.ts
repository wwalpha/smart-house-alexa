import { ChannelControllerRequest, ChannelControllerResponse } from 'typings/alexa';
import { IotData } from 'aws-sdk';

const IOT_ENDPOINT = process.env.IOT_ENDPOINT as string;
const IOT_REGION = process.env.IOT_REGION as string;

export default async ({ directive: { header, payload, endpoint } }: ChannelControllerRequest): Promise<ChannelControllerResponse> => {
  switch (header.name) {
    case 'ChangeChannel':
      await change(payload.channel && payload.channel.number);
      break;
    case 'SkipChannels':
      await skip(payload.channelCount);
      break;
  }

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
    },
    context: {
      properties: [
        {
          namespace: 'Alexa.ChannelController',
          name: 'channel',
          timeOfSample: '2017-02-03T16:20:50.52Z',
          value: {
            number: '1111',
            callSign: 'KSTATION1',
            affiliateCallSign: 'KSTATION1',
          },
          uncertaintyInMilliseconds: 1000,
        },
      ],
    },
  };
};

const change = async (value?: string) => {
  const client = new IotData({
    region: IOT_REGION,
    endpoint: IOT_ENDPOINT,
  });

  await client
    .publish({
      topic: `iot/channel/change`,
      qos: 0,
      payload: JSON.stringify({
        channel: value,
      }),
    })
    .promise();
};

const skip = async (channelCount?: number) => {
  const client = new IotData({
    region: IOT_REGION,
    endpoint: IOT_ENDPOINT,
  });

  await client
    .publish({
      topic: `iot/channel/skip`,
      qos: 0,
      payload: JSON.stringify({
        count: channelCount,
      }),
    })
    .promise();
};
