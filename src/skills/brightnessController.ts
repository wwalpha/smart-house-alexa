import { BrightnessControllerRequest, BrightnessControllerResponse, BrightnessControllerResponseProps, AlexaResponseProps } from 'typings/alexa';
import { getStatus, putStatus, getUTC } from 'src/utils';
import { BRIGHTNESS_CONTROLLER, STATUS_KEY } from 'src/consts';

export default async ({ directive: { header, endpoint, payload } }: BrightnessControllerRequest): Promise<BrightnessControllerResponse> => {
  const result = await getStatus(endpoint.endpointId);

  const defaultValue = header.name === 'SetBrightness' ? payload.brightness : payload.brightnessDelta;

  const resProps: BrightnessControllerResponseProps = {
    namespace: BRIGHTNESS_CONTROLLER,
    name: 'brightness',
    timeOfSample: '2017-02-03T16:20:50.52Z',
    value: defaultValue as number,
    uncertaintyInMilliseconds: 1000,
  };

  const res: BrightnessControllerResponse = {
    event: {
      header: {
        namespace: 'Alexa',
        name: 'Response',
        messageId: header.messageId,
        payloadVersion: header.payloadVersion,
        correlationToken: header.correlationToken,
      },
      endpoint,
    },
    context: {
      properties: [resProps],
    },
  };

  // 既存なし
  if (!result.Item) {
    // 状態更新
    await putStatus(endpoint.endpointId, [resProps]);

    return res;
  }

  const props = result.Item[STATUS_KEY] as AlexaResponseProps[];

  // 輝度値を更新する
  updateBrightness(props, payload.brightness);

  // DBを更新する
  await putStatus(endpoint.endpointId, props);

  return res;
};

const updateBrightness = (props: AlexaResponseProps[], value?: number) => {
  const result = props.find(item => item.namespace === BRIGHTNESS_CONTROLLER);

  if (!result) {
    props.push({
      namespace: BRIGHTNESS_CONTROLLER,
      name: 'brightness',
      value,
      timeOfSample: getUTC(),
      uncertaintyInMilliseconds: 1000,
    } as BrightnessControllerResponseProps);
    return;
  }

  // 情報更新する
  result.timeOfSample = getUTC();
  result.value = value;
};
