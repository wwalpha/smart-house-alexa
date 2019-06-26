import { AlexaRequest } from '.';

export interface DiscoveryRequest extends AlexaRequest {
  directive: {
    header: {
      namespace: 'Alexa.Discovery';
      name: 'Discover';
      messageId: string;
      payloadVersion: '3';
    };
  };
}

export interface DiscoveryResponse {
  event: {
    header: {
      namespace: 'Alexa.Discovery';
      name: 'Discover.Response';
      messageId: string;
      payloadVersion: '2' | '3';
    };
    payload: {
      endpoints: DiscoveryEndPoint[];
    };
  };
}

type DisplayCategory =
  | 'ACTIVITY_TRIGGER'
  | 'CAMERA'
  | 'CONTACT_SENSOR '
  | 'DOOR DOORBELL'
  | 'LIGHT'
  | 'MICROWAVE'
  | 'MOTION_SENSOR'
  | 'OTHER'
  | 'SCENE_TRIGGER'
  | 'SECURITY_PANEL'
  | 'SMARTLOCK'
  | 'SMARTPLUG'
  | 'SPEAKER'
  | 'SWITCH'
  | 'TEMPERATURE_SENSOR'
  | 'THERMOSTAT'
  | 'TV';

type CapabilitySupported = {
  name: string;
};
type CapabilityInterface =
  | 'Alexa'
  | 'Alexa.BrightnessController'
  | 'Alexa.CameraStreamController'
  | 'Alexa.ChannelController'
  | 'Alexa.ColorController'
  | 'Alexa.ColorTemperatureController'
  | 'Alexa.ContactSensor'
  | 'Alexa.DoorbellEventSource'
  | 'Alexa.EndpointHealth'
  | 'Alexa.EqualizerController'
  | 'Alexa.EventDetectionSensor'
  | 'Alexa.InputController'
  | 'Alexa.LockController'
  | 'Alexa.MediaMetadata'
  | 'Alexa.ModeController'
  | 'Alexa.MotionSensor'
  | 'Alexa.PercentageController'
  | 'Alexa.PlaybackController'
  | 'Alexa.PowerController'
  | 'Alexa.PowerLevelController'
  | 'Alexa.RangeController'
  | 'Alexa.RTCSessionController'
  | 'Alexa.SceneController'
  | 'Alexa.SecurityPanelController'
  | 'Alexa.Speaker'
  | 'Alexa.StepSpeaker'
  | 'Alexa.TemperatureSensor'
  | 'Alexa.ThermostatController'
  | 'Alexa.TimeHoldController'
  | 'Alexa.ToggleController'
  | 'Alexa.WakeOnLANController';

type Capability = {
  type: 'AlexaInterface';
  interface: CapabilityInterface;
  version: '3';
  properties?: {
    supported?: CapabilitySupported[];
    proactivelyReported: boolean;
    retrievable: boolean;
  };
};

type AdditionalAttribute = {
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  softwareVersion?: string;
  customIdentifier?: string;
};

type DiscoveryEndPoint = {
  endpointId: string;
  manufacturerName: string;
  description: string;
  friendlyName: string;
  additionalAttributes?: AdditionalAttribute;
  displayCategories: DisplayCategory[];
  capabilities: Capability[];
  connections?: any[];
  cookie?: any;
  // capabilities: [
  //   {
  //     type: 'AlexaInterface';
  //     interface: 'Alexa.BrightnessController';
  //     version: '3';
  //     properties: {
  //       supported: [
  //         {
  //           name: 'brightness';
  //         }
  //       ];
  //       proactivelyReported: true;
  //       retrievable: true;
  //     };
  //   },
  //   {
  //     type: 'AlexaInterface';
  //     interface: 'Alexa.ColorController';
  //     version: '3';
  //     properties: {
  //       supported: [
  //         {
  //           name: 'color';
  //         }
  //       ];
  //       proactivelyReported: true;
  //       retrievable: true;
  //     };
  //   },
  //   {
  //     type: 'AlexaInterface';
  //     interface: 'Alexa.ColorTemperatureController';
  //     version: '3';
  //     properties: {
  //       supported: [
  //         {
  //           name: 'colorTemperatureInKelvin';
  //         }
  //       ];
  //       proactivelyReported: true;
  //       retrievable: true;
  //     };
  //   },
  //   {
  //     type: 'AlexaInterface';
  //     interface: 'Alexa.EndpointHealth';
  //     version: '3';
  //     properties: {
  //       supported: [
  //         {
  //           name: 'connectivity';
  //         }
  //       ];
  //       proactivelyReported: true;
  //       retrievable: true;
  //     };
  //   }
  // ];
  // connections?: [
  //   {
  //     type: 'TCP_IP';
  //     macAddress: '00:11:22:AA:BB:33:44:55';
  //   },
  //   {
  //     type: 'ZIGBEE';
  //     macAddress: '00:11:22:33:44:55';
  //   },
  //   {
  //     type: 'ZWAVE';
  //     homeId: '<0x00000000>';
  //     nodeId: '<0x00>';
  //   },
  //   {
  //     type: 'UNKNOWN';
  //     value: '00:11:22:33:44:55';
  //   }
  // ];
};
