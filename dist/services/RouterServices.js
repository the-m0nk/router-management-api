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
exports.RouterService = void 0;
const RouterRepository_1 = require("../repositories/RouterRepository");
class RouterService {
    constructor() {
        this.routerRepository = new RouterRepository_1.RouterRepository();
    }
    getRouterStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.routerRepository.getStatus();
        });
    }
    enableWifi() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.routerRepository.enableWifi();
        });
    }
    disableWifi() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.routerRepository.disableWifi();
        });
    }
    enableFirewall() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.routerRepository.enableFirewall();
        });
    }
    disableFirewall() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.routerRepository.disableFirewall();
        });
    }
    changePassword(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.routerRepository.changePassword(dto.newPassword);
        });
    }
}
exports.RouterService = RouterService;
