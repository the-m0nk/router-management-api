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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routerRoutes_1 = require("../routes/routerRoutes");
const errorHandler_1 = require("../middleware/errorHandler");
describe('RouterController', () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/router', routerRoutes_1.routerRoutes);
        app.use(errorHandler_1.errorHandler);
    });
    it('should get router status', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/router/status');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('model', 'RouterModel123');
        expect(response.body).toHaveProperty('firmwareVersion', '1.0.0');
    }));
    it('should enable WiFi', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/router/settings/wifi/enable');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'WiFi has been enabled.',
        });
    }));
    it('should disable WiFi', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/router/settings/wifi/disable');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'WiFi has been disabled.',
        });
    }));
    it('should enable firewall', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/router/settings/firewall/enable');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Firewall has been enabled.',
        });
    }));
    it('should disable firewall', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/router/settings/firewall/disable');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Firewall has been disabled.',
        });
    }));
    it('should change password with valid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/router/settings/password/change')
            .send({ newPassword: 'newSecurePass123' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Password has been changed.',
        });
    }));
    it('should fail to change password with invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/router/settings/password/change')
            .send({ newPassword: 'short' });
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
    }));
});
