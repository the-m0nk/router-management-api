"use strict";
// import { RouterStatusDTO } from "../dtos/RouterStatusDTO";
// import { IRouterRepository } from "./IRouterRepository";
// import wifi from "node-wifi";
// import os from "os";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterRepository = void 0;
// export class RouterRepository implements IRouterRepository {
//   private wifiEnabled: boolean = true;
//   private firewallEnabled: boolean = true;
//   async getStatus(): Promise<RouterStatusDTO> {
//     try {
//       const currentConnection = await new Promise<any>((resolve, reject) => {
//         wifi.getCurrentConnections((err, connections) => {
//           if (err) {
//             console.error("Error in getCurrentConnections:", err);
//             reject(err);
//             return;
//           }
//           console.log("Raw connections:", JSON.stringify(connections, null, 2));
//           resolve(connections[0] || null);
//         });
//       });
//       const uptimeSeconds = os.uptime();
//       const uptime = `${Math.floor(uptimeSeconds / 3600)} hours`;
//       const interfaces = os.networkInterfaces();
//       let macAddress = "00:00:00:00:00:00";
//       let model = "Unknown";
//       for (const iface in interfaces) {
//         const wifiInterface = interfaces[iface]?.find(
//           (details) => details.family === "IPv4" && !details.internal
//         );
//         if (wifiInterface) {
//           macAddress = wifiInterface.mac || macAddress;
//           model = iface;
//           break;
//         }
//       }
//       if (!currentConnection || !currentConnection.ssid) {
//         console.log("No active WiFi connection detected, using fallback data");
//         return new RouterStatusDTO({
//           model: "No WiFi Interface",
//           firmwareVersion: "N/A",
//           macAddress,
//           serialNumber: "N/A",
//           uptime,
//         });
//       }
//       console.log(
//         "Active connection:",
//         JSON.stringify(currentConnection, null, 2)
//       );
//       return new RouterStatusDTO({
//         model: currentConnection.ssid || model,
//         firmwareVersion: "N/A",
//         macAddress: currentConnection.mac || macAddress,
//         serialNumber: currentConnection.bssid || "N/A",
//         uptime,
//       });
//     } catch (error: any) {
//       console.error("Error fetching router status:", error);
//       const uptimeSeconds = os.uptime();
//       const uptime = `${Math.floor(uptimeSeconds / 3600)} hours`;
//       const interfaces = os.networkInterfaces();
//       let macAddress = "00:00:00:00:00:00";
//       let model = "Unknown";
//       for (const iface in interfaces) {
//         const wifiInterface = interfaces[iface]?.find(
//           (details) => details.family === "IPv4" && !details.internal
//         );
//         if (wifiInterface) {
//           macAddress = wifiInterface.mac || macAddress;
//           model = iface;
//           break;
//         }
//       }
//       return new RouterStatusDTO({
//         model: "Error: No WiFi Data",
//         firmwareVersion: "N/A",
//         macAddress,
//         serialNumber: "N/A",
//         uptime,
//       });
//     }
//   }
//   async enableWifi(): Promise<{ success: boolean; message: string }> {
//     this.wifiEnabled = true;
//     return { success: true, message: "WiFi has been enabled." };
//   }
//   async disableWifi(): Promise<{ success: boolean; message: string }> {
//     this.wifiEnabled = false;
//     return { success: true, message: "WiFi has been disabled." };
//   }
//   async enableFirewall(): Promise<{ success: boolean; message: string }> {
//     this.firewallEnabled = true;
//     return { success: true, message: "Firewall has been enabled." };
//   }
//   async disableFirewall(): Promise<{ success: boolean; message: string }> {
//     this.firewallEnabled = false;
//     return { success: true, message: "Firewall has been disabled." };
//   }
//   async changePassword(
//     newPassword: string
//   ): Promise<{ success: boolean; message: string }> {
//     // Simulate password change
//     return { success: true, message: "Password has been changed." };
//   }
// }
const RouterStatusDTO_1 = require("../dtos/RouterStatusDTO");
const node_wifi_1 = __importDefault(require("node-wifi"));
const os_1 = __importDefault(require("os"));
// Implementation
class RouterRepository {
    constructor() {
        this.initialized = false;
        this.initializeWifi();
    }
    initializeWifi() {
        try {
            node_wifi_1.default.init({
                iface: null, // Use default interface
            });
            this.initialized = true;
            console.log('node-wifi initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize node-wifi:', error);
            this.initialized = false;
        }
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Reinitialize if not initialized
                if (!this.initialized) {
                    console.log('Reinitializing node-wifi');
                    this.initializeWifi();
                    if (!this.initialized) {
                        throw new Error('node-wifi initialization failed');
                    }
                }
                // Get current WiFi connection
                const currentConnection = yield new Promise((resolve, reject) => {
                    node_wifi_1.default.getCurrentConnections((err, connections) => {
                        if (err) {
                            console.error('Error in getCurrentConnections:', err);
                            reject(err);
                            return;
                        }
                        console.log('Raw connections:', JSON.stringify(connections, null, 2));
                        resolve(connections[0] || null);
                    });
                });
                // Get system uptime
                const uptimeSeconds = os_1.default.uptime();
                const uptime = `${Math.floor(uptimeSeconds / 3600)} hours`;
                // Get network interface details as fallback
                const interfaces = os_1.default.networkInterfaces();
                let macAddress = '00:00:00:00:00:00';
                let model = 'Unknown';
                for (const iface in interfaces) {
                    const wifiInterface = (_a = interfaces[iface]) === null || _a === void 0 ? void 0 : _a.find((details) => details.family === 'IPv4' && !details.internal);
                    if (wifiInterface) {
                        macAddress = wifiInterface.mac || macAddress;
                        model = iface;
                        break;
                    }
                }
                if (!currentConnection || !currentConnection.ssid) {
                    console.log('No active WiFi connection detected');
                    return new RouterStatusDTO_1.RouterStatusDTO({
                        model: 'No WiFi Interface',
                        firmwareVersion: 'N/A',
                        macAddress,
                        serialNumber: 'N/A',
                        uptime,
                    });
                }
                console.log('Active connection:', JSON.stringify(currentConnection, null, 2));
                return new RouterStatusDTO_1.RouterStatusDTO(Object.assign({ model: currentConnection.ssid || model, firmwareVersion: 'N/A', macAddress: currentConnection.mac || macAddress, serialNumber: currentConnection.bssid || 'N/A', uptime, ssid: currentConnection.ssid, mode: currentConnection.mode, channel: currentConnection.channel, frequency: currentConnection.frequency, signal_level: currentConnection.signal_level, quality: currentConnection.quality, security: currentConnection.security, security_flags: currentConnection.security_flags }, currentConnection));
            }
            catch (error) {
                console.error('Error fetching router status:', error);
                // Fallback using os.networkInterfaces
                const uptimeSeconds = os_1.default.uptime();
                const uptime = `${Math.floor(uptimeSeconds / 3600)} hours`;
                const interfaces = os_1.default.networkInterfaces();
                let macAddress = '00:00:00:00:00:00';
                let model = 'Unknown';
                for (const iface in interfaces) {
                    const wifiInterface = (_b = interfaces[iface]) === null || _b === void 0 ? void 0 : _b.find((details) => details.family === 'IPv4' && !details.internal);
                    if (wifiInterface) {
                        macAddress = wifiInterface.mac || macAddress;
                        model = iface;
                        break;
                    }
                }
                return new RouterStatusDTO_1.RouterStatusDTO({
                    model: 'Error: No WiFi Data',
                    firmwareVersion: 'N/A',
                    macAddress,
                    serialNumber: 'N/A',
                    uptime,
                });
            }
        });
    }
    enableWifi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return { success: true, message: 'WiFi enabled successfully' };
            }
            catch (error) {
                return { success: false, message: `Failed to enable WiFi: ${error.message}` };
            }
        });
    }
    disableWifi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return { success: true, message: 'WiFi disabled successfully' };
            }
            catch (error) {
                return { success: false, message: `Failed to disable WiFi: ${error.message}` };
            }
        });
    }
    enableFirewall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return { success: true, message: 'Firewall enabled successfully' };
            }
            catch (error) {
                return { success: false, message: `Failed to enable firewall: ${error.message}` };
            }
        });
    }
    disableFirewall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return { success: true, message: 'Firewall disabled successfully' };
            }
            catch (error) {
                return { success: false, message: `Failed to disable firewall: ${error.message}` };
            }
        });
    }
    changePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return { success: true, message: 'Password changed successfully' };
            }
            catch (error) {
                return { success: false, message: `Failed to change password: ${error.message}` };
            }
        });
    }
}
exports.RouterRepository = RouterRepository;
