import { AuthorizationRequest, AuthorizationResponse } from 'typings/alexa';

export default ({ directive: { header, payload } }: AuthorizationRequest): AuthorizationResponse => {
  return {
    event: {
      header: {
        namespace: 'Alexa.Authorization',
        name: 'AcceptGrant.Response',
        messageId: header.messageId,
        payloadVersion: header.payloadVersion,
      },
      payload,
    },
  };
};
