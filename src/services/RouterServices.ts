import { PasswordChangeDTO } from '../dtos/PasswordChangedDTO';
import { RouterStatusDTO } from '../dtos/RouterStatusDTO';
import { IRouterRepository } from '../repositories/IRouterRepository';
import { RouterRepository } from '../repositories/RouterRepository';

export class RouterService {
  private routerRepository: IRouterRepository;

  constructor() {
    this.routerRepository = new RouterRepository();
  }

  async getRouterStatus(): Promise<RouterStatusDTO> {
    return await this.routerRepository.getStatus();
  }

  async enableWifi(): Promise<{ success: boolean; message: string }> {
    return await this.routerRepository.enableWifi();
  }

  async disableWifi(): Promise<{ success: boolean; message: string }> {
    return await this.routerRepository.disableWifi();
  }

  async enableFirewall(): Promise<{ success: boolean; message: string }> {
    return await this.routerRepository.enableFirewall();
  }

  async disableFirewall(): Promise<{ success: boolean; message: string }> {
    return await this.routerRepository.disableFirewall();
  }

  async changePassword(dto: PasswordChangeDTO): Promise<{ success: boolean; message: string }> {
    return await this.routerRepository.changePassword(dto.newPassword);
  }
}