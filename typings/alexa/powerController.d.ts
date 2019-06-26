import { AlexaResponse, AlexaRequest, AlexaRequestInfo } from './index';

type PowerControllerRequestInfo = AlexaRequestInfo & {
  header: {
    namespace: 'Alexa.PowerController';
    name: 'TurnOn' | 'TurnOff';
    messageId: string;
    correlationToken: string;
    payloadVersion: '3';
  };
};

export interface PowerControllerRequest {
  directive: PowerControllerRequestInfo;
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
