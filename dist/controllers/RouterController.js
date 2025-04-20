"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterController = void 0;
const validateDTO_1 = require("../utils/validateDTO");
const PasswordChangedDTO_1 = require("../dtos/PasswordChangedDTO");
class RouterController {
    constructor(routerService) {
        this.routerService = routerService;
    }
    getRouterStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield this.routerService.getRouterStatus();
                res.json(status);
            }
            catch (error) {
                next(error);
            }
        });
    }
    enableWifi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.routerService.enableWifi();
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    disableWifi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.routerService.disableWifi();
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    enableFirewall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.routerService.enableFirewall();
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    disableFirewall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.routerService.disableFirewall();
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    //   try {
    //     const passwordChangeDTO = await validateDTO(PasswordChangeDTO, req.body);
    //     const result = await this.routerService.changePassword(passwordChangeDTO);
    //     res.json(result);
    //   } catch (error) {
    //     next(error);
    //   }
    // }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordChangeDTO = yield (0, validateDTO_1.validateDTO)(PasswordChangedDTO_1.PasswordChangeDTO, req.body);
                if (passwordChangeDTO.newPassword.length < 8) {
                    res.status(400).json({ message: 'Password must be at least 8 characters long' });
                    return;
                }
                const result = yield this.routerService.changePassword(passwordChangeDTO);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.RouterController = RouterController;
