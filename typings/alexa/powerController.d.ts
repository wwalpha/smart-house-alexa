import { AlexaResponse, AlexaRequest } from './index';

export interface PowerControllerRequest extends AlexaRequest {
  directive: {
    header: {
      namespace: 'Alexa.PowerController';
      name: 'TurnOn' | 'TurnOff';
      messageId: string;
      correlationToken: string;
      payloadVersion: '3';
    };
  };
}

type PowerControllerProps = {
  namespace: 'Alexa.PowerController';
  name: 'powerState';
  value: 'ON' | 'OFF';
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
};

export interface PowerControllerResponse extends AlexaResponse {
  context: {
    properties: PowerControllerProps[];
  };
}
