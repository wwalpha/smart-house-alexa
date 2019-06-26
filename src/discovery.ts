import { DiscoveryRequest, DiscoveryResponse } from 'typings/alexa';

export default ({ directive: { header } }: DiscoveryRequest): DiscoveryResponse => {
  return {
    event: {
      header: {
        namespace: 'Alexa.Discovery',
        name: 'Discover.Response',
        messageId: header.messageId,
        payloadVersion: header.payloadVersion,
      },
      payload: {
        endpoints: [
          {
            endpointId: '38A28869-DD5E-48CE-BBE5-A4DB78CECB28',
            manufacturerName: 'Sony',
            description: 'Bravia X9300D',
            friendlyName: 'テレビ',
            displayCategories: ['TV'],
            capabilities: [
              {
                type: 'AlexaInterface',
                interface: 'Alexa',
                version: '3',
              },
              {
                type: 'AlexaInterface',
                interface: 'Alexa.PowerController',
                version: '3',
                properties: {
                  supported: [
                    {
                      name: 'powerState',
                    },
                  ],
                  proactivelyReported: true,
                  retrievable: true,
                },
              },
            ],
          },
        ],
      },
    },
  };
};
