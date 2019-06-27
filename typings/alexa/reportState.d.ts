import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload } from './index';

interface ReportStateHeader {
  namespace: 'Alexa';
  name: 'ReportState';
  messageId: string;
  correlationToken: string;
  payloadVersion: '3';
}

interface ReportStateRequestDirective {
  header: ReportStateHeader;
  endpoint: AlexaEndpoint;
  payload?: AlexaPayload;
}

export interface ReportStateRequest {
  directive: ReportStateRequestDirective;
}

interface ReportStateResponseProps {
  namespace: string;
  name: string;
  value: any;
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

interface ReportStateResponseEvent {
  header: ReportStateHeader;
  endpoint: AlexaEndpoint;
  context: {
    properties: ReportStateResponseProps[];
  };
  payload?: AlexaPayload;
}

export interface ReportStateResponse {
  event: ReportStateResponseEvent;
}
