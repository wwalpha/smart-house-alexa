import {
  AuthorizationRequest,
  DiscoveryRequest,
  PowerControllerRequest,
  AlexaRequest,
  StepSpeakerRequest,
  ChannelControllerRequest,
  ReportStateRequest,
  BrightnessControllerRequest,
} from 'typings/alexa/index';
import powerController from './skills/powerController';
import authorization from './skills/authorization';
import discovery from './skills/discovery';
import stepSpeaker from './skills/stepSpeaker';
import channelController from './skills/channelController';
import reportState from './skills/reportState';
import brightnessController from './skills/brightnessController';

export const handler = async (event: AlexaRequest) => {
  console.log(event);
  console.log(event.directive);
  console.log(event.directive.endpoint);

  let req: any;

  switch (event.directive.header.namespace) {
    case 'Alexa.Authorization':
      req = authorization((event as unknown) as AuthorizationRequest);
      break;
    case 'Alexa.Discovery':
      req = await discovery(event as DiscoveryRequest);
      break;
    case 'Alexa.PowerController':
      req = await powerController(event as PowerControllerRequest);
      break;
    case 'Alexa.ChannelController':
      req = await channelController(event as ChannelControllerRequest);
      break;
    case 'Alexa.StepSpeaker':
      req = await stepSpeaker(event as StepSpeakerRequest);
      break;
    case 'Alexa.BrightnessController':
      req = await brightnessController(event as BrightnessControllerRequest);
      break;
    case 'Alexa':
      if (event.directive.header.name === 'ReportState') {
        req = await reportState(event as ReportStateRequest);
      }
      break;
  }

  console.log(req);
  console.log(req.context.properties);

  return req;
};
