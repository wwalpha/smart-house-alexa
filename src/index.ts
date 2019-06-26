import { AuthorizationRequest, DiscoveryResponse, DiscoveryRequest, PowerControllerRequest, AlexaRequest } from 'typings/alexa/index';
import powerController from './powerController';
import authorization from './authorization';

export const handler = async (event: AlexaRequest) => {
  console.log(event);
  console.log(event.directive);

  switch (event.directive.header.namespace) {
    case 'Alexa.Authorization':
      return authorization(event as AuthorizationRequest);
    case 'Alexa.Discovery':
      return discovery(event as DiscoveryRequest);
    case 'Alexa.PowerController':
      return powerController(event as PowerControllerRequest);
  }

  return null;
};
