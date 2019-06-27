import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload, AlexaResponseEvent } from './index';

interface PowerControllerRequestHeader {
  namespace: 'Alexa.PowerController';
  name: 'TurnOn' | 'TurnOff';
  messageId: string;
  correlationToken: string;
  payloadVersion: '3';
}

interface PowerControllerRequestDirective {
  header: PowerControllerRequestHeader;
  endpoint: AlexaEndpoint;
  payload?: AlexaPayload;
}

export interface PowerControllerRequest {
  directive: PowerControllerRequestDirective;
}

interface PowerControllerResponseProps {
  namespace: 'Alexa.PowerController';
  name: 'powerState';
  value: 'ON' | 'OFF';
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

export interface PowerControllerResponse {
  event: AlexaResponseEvent;
  context: {
    properties: PowerControllerResponseProps[];
  };
}
