import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload, AlexaResponseEvent } from './index';

interface BrightnessControllerRequestHeader {
  namespace: 'Alexa.BrightnessController';
  name: 'SetBrightness' | 'AdjustBrightness';
  messageId: string;
  correlationToken: string;
  payloadVersion: '3';
}

interface BrightnessControllerRequestPayload {
  brightnessDelta?: number;
  brightness?: number;
}

interface BrightnessControllerRequestDirective {
  header: BrightnessControllerRequestHeader;
  endpoint: AlexaEndpoint;
  payload: BrightnessControllerRequestPayload;
}

export interface BrightnessControllerRequest {
  directive: BrightnessControllerRequestDirective;
}

export interface BrightnessControllerResponseProps {
  namespace: 'Alexa.BrightnessController';
  name: 'brightness';
  value: number;
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

export interface BrightnessControllerResponse {
  event: AlexaResponseEvent;
  context: {
    properties: BrightnessControllerResponseProps[];
  };
}
