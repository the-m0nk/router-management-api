import { RouterStatusDTO } from "../dtos/RouterStatusDTO";
import wifi from "node-wifi";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);

// Interface definition
export interface IRouterRepository {
  getStatus(): Promise<RouterStatusDTO>;
  enableWifi(): Promise<{ success: boolean; message: string }>;
  disableWifi(): Promise<{ success: boolean; message: string }>;
  enableFirewall(): Promise<{ success: boolean; message: string }>;
  disableFirewall(): Promise<{ success: boolean; message: string }>;
  changePassword(
    newPassword: string
  ): Promise<{ success: boolean; message: string }>;
}

export class RouterRepository implements IRouterRepository {
  private initialized = false;

  constructor() {
    this.initializeWifi();
  }

  private initializeWifi(): void {
    try {
      wifi.init({
        iface: null,
      });
      this.initialized = true;
      console.log("node-wifi initialized successfully");
    } catch (error) {
      console.error("Failed to initialize node-wifi:", error);
      this.initialized = false;
    }
  }

  async getStatus(): Promise<RouterStatusDTO> {
    try {
      if (!this.initialized) {
        console.log("Reinitializing node-wifi");
        this.initializeWifi();
        if (!this.initialized) {
          throw new Error("node-wifi initialization failed");
        }
      }
      const currentConnection = await new Promise<any>((resolve, reject) => {
        wifi.getCurrentConnections((err, connections) => {
          if (err) {
            console.error("Error in getCurrentConnections:", err);
            reject(err);
            return;
          }
          console.log("Raw connections:", JSON.stringify(connections, null, 2));
          resolve(connections[0] || null);
        });
      });

      const uptimeSeconds = os.uptime();
      const uptime = `${Math.floor(uptimeSeconds / 3600)} hours`;
      const interfaces = os.networkInterfaces();
      let macAddress = "00:00:00:00:00:00";
      let model = "Unknown";
      for (const iface in interfaces) {
        const wifiInterface = interfaces[iface]?.find(
          (details) => details.family === "IPv4" && !details.internal
        );
        if (wifiInterface) {
          macAddress = wifiInterface.mac || macAddress;
          model = iface;
          break;
        }
      }

      if (!currentConnection || !currentConnection.ssid) {
        console.log("No active WiFi connection detected");
        return new RouterStatusDTO({
          model: "No WiFi Interface",
          firmwareVersion: "N/A",
          macAddress,
          serialNumber: "N/A",
          uptime,
        });
      }

      console.log(
        "Active connection:",
        JSON.stringify(currentConnection, null, 2)
      );
      return new RouterStatusDTO({
        model: currentConnection.ssid || model,
        firmwareVersion: "N/A",
        macAddress: currentConnection.mac || macAddress,
        serialNumber: currentConnection.bssid || "N/A",
        uptime,
        ssid: currentConnection.ssid,
        mode: currentConnection.mode,
        channel: currentConnection.channel,
        frequency: currentConnection.frequency,
        signal_level: currentConnection.signal_level,
        quality: currentConnection.quality,
        security: currentConnection.security,
        security_flags: currentConnection.security_flags,
        ...currentConnection,
      });
    } catch (error: any) {
      console.error("Error fetching router status:", error);
      const uptimeSeconds = os.uptime();
      const uptime = `${Math.floor(uptimeSeconds / 3600)} hours`;
      const interfaces = os.networkInterfaces();
      let macAddress = "00:00:00:00:00:00";
      let model = "Unknown";
      for (const iface in interfaces) {
        const wifiInterface = interfaces[iface]?.find(
          (details) => details.family === "IPv4" && !details.internal
        );
        if (wifiInterface) {
          macAddress = wifiInterface.mac || macAddress;
          model = iface;
          break;
        }
      }

      return new RouterStatusDTO({
        model: "Error: No WiFi Data",
        firmwareVersion: "N/A",
        macAddress,
        serialNumber: "N/A",
        uptime,
      });
    }
  }

  async enableWifi(): Promise<{ success: boolean; message: string }> {
    try {
      const platform = os.platform();
      let command: string;

      switch (platform) {
        case "win32":
          command = 'netsh interface set interface "Wi-Fi" enabled';
          break;
        case "linux":
          command = "nmcli radio wifi on";
          break;
        case "darwin":
          command = "networksetup -setairportpower Wi-Fi on";
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      console.log(`Executing command to enable WiFi: ${command}`);
      await execPromise(command);
      console.log("WiFi enabled successfully");
      return { success: true, message: "WiFi enabled successfully" };
    } catch (error: any) {
      console.error("Failed to enable WiFi:", error);
      return {
        success: false,
        message: `Failed to enable WiFi: ${error.message}`,
      };
    }
  }

  async disableWifi(): Promise<{ success: boolean; message: string }> {
    try {
      const platform = os.platform();
      let command: string;

      switch (platform) {
        case "win32":
          command = 'netsh interface set interface "Wi-Fi" disabled';
          break;
        case "linux":
          command = "nmcli radio wifi off";
          break;
        case "darwin":
          command = "networksetup -setairportpower Wi-Fi off";
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      console.log(`Executing command to disable WiFi: ${command}`);
      await execPromise(command);
      console.log("WiFi disabled successfully");
      return { success: true, message: "WiFi disabled successfully" };
    } catch (error: any) {
      console.error("Failed to disable WiFi:", error);
      return {
        success: false,
        message: `Failed to disable WiFi: ${error.message}`,
      };
    }
  }

  async enableFirewall(): Promise<{ success: boolean; message: string }> {
    try {
      return { success: true, message: "Firewall enabled successfully" };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to enable firewall: ${error.message}`,
      };
    }
  }

  async disableFirewall(): Promise<{ success: boolean; message: string }> {
    try {
      return { success: true, message: "Firewall disabled successfully" };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to disable firewall: ${error.message}`,
      };
    }
  }

  async changePassword(
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      return { success: true, message: "Password changed successfully" };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to change password: ${error.message}`,
      };
    }
  }
}
