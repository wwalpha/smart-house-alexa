import { AlexaResponse, AlexaRequest, AlexaRequestInfo } from './index';

type StepSpeakerRequestInfo = AlexaRequestInfo & {
  header: {
    namespace: 'Alexa.StepSpeaker';
    name: 'AdjustVolume' | 'SetMute';
    messageId: string;
    correlationToken: string;
    payloadVersion: '3';
  };
  payload: {
    volumeSteps?: number;
    mute?: boolean;
  };
};

export interface StepSpeakerRequest {
  directive: StepSpeakerRequestInfo;
}

export interface StepSpeakerResponse extends AlexaResponse {
  context: {
    properties: [];
  };
}
