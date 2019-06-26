import { AlexaRequest } from '.';

export interface AuthorizationRequest extends AlexaRequest {
  header: {
    namespace: 'Alexa.Authorization';
    name: 'AcceptGrant';
    messageId: string;
    payloadVersion: '3';
  };
  payload: {
    grant: {
      type: string;
      code: string;
    };
    grantee: {
      type: string;
      token: string;
    };
  };
}

export interface AuthorizationResponse {
  event: {
    header: {
      namespace: 'Alexa.Authorization';
      name: 'AcceptGrant.Response';
      messageId: string;
      payloadVersion: '2' | '3';
    };
    payload: {};
  };
}
