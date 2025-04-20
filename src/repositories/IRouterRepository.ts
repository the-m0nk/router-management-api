import { RouterStatusDTO } from '../dtos/RouterStatusDTO';

export interface IRouterRepository {
  getStatus(): Promise<RouterStatusDTO>;
  enableWifi(): Promise<{ success: boolean; message: string }>;
  disableWifi(): Promise<{ success: boolean; message: string }>;
  enableFirewall(): Promise<{ success: boolean; message: string }>;
  disableFirewall(): Promise<{ success: boolean; message: string }>;
  changePassword(newPassword: string): Promise<{ success: boolean; message: string }>;
}