import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload, AlexaResponseEvent } from './index';

interface StepSpeakerRequestHeader {
  namespace: 'Alexa.StepSpeaker';
  name: 'AdjustVolume' | 'SetMute';
  messageId: string;
  correlationToken: string;
  payloadVersion: '3';
}
interface StepSpeakerRequestPayload {
  volumeSteps?: number;
  mute?: boolean;
}

interface StepSpeakerRequestDirective {
  header: StepSpeakerRequestHeader;
  endpoint: AlexaEndpoint;
  payload: StepSpeakerRequestPayload;
}

export interface StepSpeakerRequest {
  directive: StepSpeakerRequestDirective;
}

export interface StepSpeakerResponse {
  event: AlexaResponseEvent;
  context: {
    properties: [];
  };
}
