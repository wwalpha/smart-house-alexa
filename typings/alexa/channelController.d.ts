import { AlexaResponse, AlexaRequest, AlexaRequestInfo } from './index';

type ChannelControllerRequestInfo = AlexaRequestInfo & {
  header: {
    namespace: 'Alexa.ChannelController';
    name: 'ChangeChannel' | 'SkipChannels';
    messageId: string;
    correlationToken: string;
    payloadVersion: '3';
  };
  payload: {
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
  };
};

export interface ChannelControllerRequest {
  directive: ChannelControllerRequestInfo;
}

type ChannelControllerProps = {
  namespace: 'Alexa.ChannelController';
  name: 'channel';
  value: {
    number: string;
    callSign: string;
    affiliateCallSign: string;
  };
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
};

export interface ChannelControllerResponse extends AlexaResponse {
  context: {
    properties: ChannelControllerProps[];
  };
}
