export class RouterStatusDTO {
    model: string;
    firmwareVersion: string;
    macAddress: string;
    serialNumber: string;
    uptime: string;
  
    constructor(data: {
      model: string;
      firmwareVersion: string;
      macAddress: string;
      serialNumber: string;
      uptime: string;
    }) {
      this.model = data.model;
      this.firmwareVersion = data.firmwareVersion;
      this.macAddress = data.macAddress;
      this.serialNumber = data.serialNumber;
      this.uptime = data.uptime;
    }
  }