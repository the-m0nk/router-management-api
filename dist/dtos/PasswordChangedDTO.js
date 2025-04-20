"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeDTO = void 0;
class PasswordChangeDTO {
    constructor(data) {
        this.newPassword = data.newPassword;
        this.validate();
    }
    validate() {
        if (!this.newPassword || this.newPassword.length < 8) {
            throw new Error('New password must be at least 8 characters long.');
        }
    }
}
exports.PasswordChangeDTO = PasswordChangeDTO;
