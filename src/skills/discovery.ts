import { DiscoveryRequest, DiscoveryResponse } from 'typings/alexa';
import { DiscoveryEndPoint } from 'typings/alexa/discover';
import { discover } from 'src/utils';

export default async ({ directive: { header } }: DiscoveryRequest): Promise<DiscoveryResponse> => {
  const result = await discover();

  const ret: DiscoveryResponse = {
    event: {
      header: {
        namespace: 'Alexa.Discovery',
        name: 'Discover.Response',
        messageId: header.messageId,
        payloadVersion: header.payloadVersion,
      },
      payload: {
        endpoints: [],
      },
    },
  };

  // データなし
  if (result.Count === 0 || !result.Items) {
    return ret;
  }

  // 検索結果
  ret.event.payload.endpoints = (result.Items as unknown) as DiscoveryEndPoint[];

  return ret;
};
