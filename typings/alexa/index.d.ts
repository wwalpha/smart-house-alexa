export interface AlexaEndpoint {
  scope?: {
    type: string;
    token: string;
  };
  endpointId: string;
  cookie?: { [key: string]: string };
}

export interface AlexaPayload {
  [key: string]: string;
}

export interface AlexaRequestHeader {
  namespace: string;
  name: string;
  messageId: string;
  correlationToken?: string;
  payloadVersion: '3';
}

export type AlexaRequestDirective = {
  header: AlexaRequestHeader;
  endpoint?: AlexaEndpoint;
  payload?: AlexaPayload;
};

export interface AlexaRequest {
  directive: AlexaRequestDirective;
}

interface AlexaResponseHeader {
  namespace: 'Alexa';
  name: 'Response';
  messageId: string;
  correlationToken?: string;
  payloadVersion: '3';
}

export interface AlexaResponseEvent {
  header: AlexaResponseHeader;
  endpoint?: AlexaEndpoint;
  payload?: AlexaPayload;
}

export interface AlexaResponse {
  event: AlexaResponseEvent;
}

export { DiscoveryRequest, DiscoveryResponse, DiscoveryEndPoint } from './discover';
export { AuthorizationRequest, AuthorizationResponse } from './authorization';
export { PowerControllerRequest, PowerControllerResponse } from './powerController';
export { ChannelControllerRequest, ChannelControllerResponse } from './channelController';
export { StepSpeakerRequest, StepSpeakerResponse } from './stepSpeaker';
export { ReportStateRequest, ReportStateResponse } from './reportState';
