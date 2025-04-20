"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterStatusDTO = void 0;
class RouterStatusDTO {
    constructor(data) {
        this.model = data.model;
        this.firmwareVersion = data.firmwareVersion;
        this.macAddress = data.macAddress;
        this.serialNumber = data.serialNumber;
        this.uptime = data.uptime;
    }
}
exports.RouterStatusDTO = RouterStatusDTO;
