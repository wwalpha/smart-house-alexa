import { StepSpeakerRequest, StepSpeakerResponse } from 'typings/alexa';
import { IotData } from 'aws-sdk';

const IOT_ENDPOINT = process.env.IOT_ENDPOINT as string;
const IOT_REGION = process.env.IOT_REGION as string;

export default async ({ directive: { header, payload, endpoint } }: StepSpeakerRequest): Promise<StepSpeakerResponse> => {
  switch (header.name) {
    case 'AdjustVolume':
      await adjustVolume(payload.volumeSteps);
      break;
    case 'SetMute':
      await setMute(payload.mute);
      break;
  }

  return {
    event: {
      header: {
        namespace: 'Alexa',
        name: 'Response',
        messageId: header.messageId,
        payloadVersion: header.payloadVersion,
        correlationToken: header.correlationToken,
      },
      endpoint,
    },
    context: {
      properties: [],
    },
  };
};

const adjustVolume = async (value?: number) => {
  const client = new IotData({
    region: IOT_REGION,
    endpoint: IOT_ENDPOINT,
  });

  await client
    .publish({
      topic: 'iot/stepspeaker/volume',
      qos: 0,
      payload: JSON.stringify({
        volumeSteps: value,
      }),
    })
    .promise();
};

const setMute = async (mute?: boolean) => {
  const client = new IotData({
    region: IOT_REGION,
    endpoint: IOT_ENDPOINT,
  });

  await client
    .publish({
      topic: `iot/stepspeaker/mute`,
      qos: 0,
      payload: JSON.stringify({
        mute,
      }),
    })
    .promise();
};
