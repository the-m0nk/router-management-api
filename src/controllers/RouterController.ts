import { Request, Response, NextFunction } from 'express';
import { RouterService } from '../services/RouterServices';
import { RouterStatusDTO } from '../dtos/RouterStatusDTO';
import { validateDTO } from '../utils/validateDTO';
import { PasswordChangeDTO } from '../dtos/PasswordChangedDTO';

export class RouterController {
  constructor(private routerService: RouterService) {}

  async getRouterStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = await this.routerService.getRouterStatus();
      res.json(status);
    } catch (error) {
      next(error);
    }
  }

  async enableWifi(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.routerService.enableWifi();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async disableWifi(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.routerService.disableWifi();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async enableFirewall(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.routerService.enableFirewall();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async disableFirewall(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.routerService.disableFirewall();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const passwordChangeDTO = await validateDTO(PasswordChangeDTO, req.body);
      const result = await this.routerService.changePassword(passwordChangeDTO);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}