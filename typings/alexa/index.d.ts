export interface AlexaRequest {
  directive: {
    header: {
      namespace: string;
      name: string;
      messageId: string;
      correlationToken?: string;
      payloadVersion: '3';
    };
    endpoint?: {
      scope: {
        type: string;
        token: string;
      };
      endpointId: string;
      cookie: { [key: string]: string };
    };
    payload?: { [key: string]: string };
  };
}

export interface AlexaResponse {
  event: {
    header: {
      namespace: 'Alexa';
      name: 'Response';
      messageId: string;
      correlationToken?: string;
      payloadVersion: '3';
    };
    endpoint?: {
      scope: {
        type: string;
        token: string;
      };
      endpointId: string;
    };
    payload: {};
  };
}

export interface AlexaStateReport {
  event: {
    header: {
      namespace: 'Alexa';
      name: 'StateReport';
      messageId: string;
      correlationToken: string;
      payloadVersion: '3';
    };
    endpoint?: {
      scope: {
        type: 'BearerToken';
        token: string;
      };
      endpointId: string;
    };
    payload: {};
  };
}

type CommonEvent = {
  header: {
    namespace: string;
    name: string;
    messageId: string;
    payloadVersion: '3';
  };
};

export { DiscoveryRequest, DiscoveryResponse } from './discover';
export { AuthorizationRequest, AuthorizationResponse } from './authorization';
export { PowerControllerRequest, PowerControllerResponse } from './powerController';
