import { PowerControllerRequest, PowerControllerResponse } from 'typings/alexa';

export default ({ directive: { header, payload, endpoint } }: PowerControllerRequest): PowerControllerResponse => {
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
