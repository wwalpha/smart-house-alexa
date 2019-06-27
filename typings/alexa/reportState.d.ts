import { AlexaResponse, AlexaRequest, AlexaEndpoint, AlexaPayload } from './index';

interface ReportStateHeader {
  namespace: 'Alexa';
  name: 'StateReport';
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

export interface ReportStateResponseProps {
  namespace: string;
  name: string;
  value: any;
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

interface ReportStateResponseEvent {
  header: ReportStateHeader;
  endpoint: AlexaEndpoint;
  payload?: AlexaPayload;
}

export interface ReportStateResponse {
  event: ReportStateResponseEvent;
  context: {
    properties: ReportStateResponseProps[];
  };
}
