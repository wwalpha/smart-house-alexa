import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload, AlexaResponseEvent } from './index';

interface AuthorizationRequestHeader {
  namespace: 'Alexa.Authorization';
  name: 'AcceptGrant';
  messageId: string;
  payloadVersion: '3';
}
interface AuthorizationRequestPayload {
  grant: {
    type: string;
    code: string;
  };
  grantee: {
    type: string;
    token: string;
  };
}

interface AuthorizationRequestDirective {
  header: AuthorizationRequestHeader;
  payload: AuthorizationRequestPayload;
}

export interface AuthorizationRequest {
  directive: AuthorizationRequestDirective;
}

interface AuthorizationResponseHeader {
  namespace: 'Alexa.Authorization';
  name: 'AcceptGrant.Response';
  messageId: string;
  payloadVersion: '3';
}

interface AuthorizationResponseEvent {
  header: AuthorizationResponseHeader;
  payload?: AlexaPayload;
}

export interface AuthorizationResponse {
  event: AuthorizationResponseEvent;
}
