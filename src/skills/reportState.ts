import { ReportStateRequest, ReportStateResponse, ReportStateResponseProps } from 'typings/alexa';
import { status } from 'src/utils';

export default async ({ directive: { header, endpoint, payload } }: ReportStateRequest): Promise<ReportStateResponse> => {
  const result = await status(endpoint.endpointId);

  const ret: ReportStateResponse = {
    event: {
      header: {
        namespace: 'Alexa',
        name: 'StateReport',
        correlationToken: header.correlationToken,
        messageId: header.messageId,
        payloadVersion: header.payloadVersion,
      },
      endpoint,
      payload,
    },
    context: {
      properties: [],
    },
  };

  // データなし
  if (!result.Item) {
    return ret;
  }

  // 検索結果
  ret.context.properties = result.Item['properties'] as ReportStateResponseProps[];

  return ret;
};
