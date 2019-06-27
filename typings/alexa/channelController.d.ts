import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload, AlexaResponseEvent } from './index';

interface ChannelControllerRequestHeader {
  namespace: 'Alexa.ChannelController';
  name: 'ChangeChannel' | 'SkipChannels';
  messageId: string;
  correlationToken: string;
  payloadVersion: '3';
}

interface ChannelControllerRequestPayload {
  channelCount?: number;
  channel?: {
    number?: string;
    callSign?: string;
    affiliateCallSign?: string;
    uri?: string;
  };
  channelMetadata?: {
    name?: string;
    image?: string;
  };
}

interface ChannelControllerRequestDirective {
  header: ChannelControllerRequestHeader;
  endpoint: AlexaEndpoint;
  payload: ChannelControllerRequestPayload;
}

export interface ChannelControllerRequest {
  directive: ChannelControllerRequestDirective;
}

interface ChannelControllerResponseProps {
  namespace: 'Alexa.ChannelController';
  name: 'channel';
  value: {
    number: string;
    callSign: string;
    affiliateCallSign: string;
  };
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

export interface ChannelControllerResponse {
  event: AlexaResponseEvent;
  context: {
    properties: ChannelControllerResponseProps[];
  };
}
