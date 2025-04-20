export class PasswordChangeDTO {
    newPassword: string;
  
    constructor(data: { newPassword: string }) {
      this.newPassword = data.newPassword;
      this.validate();
    }
  
    private validate(): void {
      if (!this.newPassword || this.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long.');
      }
    }
  }