// export class RouterStatusDTO {
//     model: string;
//     firmwareVersion: string;
//     macAddress: string;
//     serialNumber: string;
//     uptime: string;
  
//     constructor(data: {
//       model: string;
//       firmwareVersion: string;
//       macAddress: string;
//       serialNumber: string;
//       uptime: string;
//     }) {
//       this.model = data.model;
//       this.firmwareVersion = data.firmwareVersion;
//       this.macAddress = data.macAddress;
//       this.serialNumber = data.serialNumber;
//       this.uptime = data.uptime;
//     }
//   }
export interface RouterStatus {
  model: string;
  firmwareVersion: string;
  macAddress: string;
  serialNumber: string;
  uptime: string;
  ssid?: string;
  mode?: string;
  channel?: number;
  frequency?: number;
  signal_level?: number;
  quality?: number;
  security?: string;
  security_flags?: string;
  [key: string]: any; // Allow additional properties
}

export class RouterStatusDTO {
  public model: string;
  public firmwareVersion: string;
  public macAddress: string;
  public serialNumber: string;
  public uptime: string;
  public ssid?: string;
  public mode?: string;
  public channel?: number;
  public frequency?: number;
  public signal_level?: number;
  public quality?: number;
  public security?: string;
  public security_flags?: string;
  [key: string]: any;

  constructor(data: RouterStatus) {
    this.model = data.model;
    this.firmwareVersion = data.firmwareVersion;
    this.macAddress = data.macAddress;
    this.serialNumber = data.serialNumber;
    this.uptime = data.uptime;
    this.ssid = data.ssid;
    this.mode = data.mode;
    this.channel = data.channel;
    this.frequency = data.frequency;
    this.signal_level = data.signal_level;
    this.quality = data.quality;
    this.security = data.security;
    this.security_flags = data.security_flags;

    // Copy any additional properties
    for (const key in data) {
      if (!(key in this)) {
        this[key] = data[key];
      }
    }
  }
}