"use strict";
// export class RouterStatusDTO {
//     model: string;
//     firmwareVersion: string;
//     macAddress: string;
//     serialNumber: string;
//     uptime: string;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterStatusDTO = void 0;
class RouterStatusDTO {
    constructor(data) {
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
exports.RouterStatusDTO = RouterStatusDTO;
