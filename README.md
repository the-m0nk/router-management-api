# Implementation Details

**Architecture:** The API follows a layered architecture with controllers (handling HTTP requests), services (business logic), and repositories (data access). The IRouterRepository interface ensures extensibility for real router integration.

## SOLID Principles:

- **Single Responsibility:** Each class (e.g., RouterController, RouterService) has a single purpose.

- **Open/Closed:** The repository layer is extensible via IRouterRepository.

- **Liskov Substitution:** Repository implementations can be swapped without affecting the codebase.

- **Interface Segregation:** Interfaces are specific to router operations.

- **Dependency Inversion:** Dependencies are injected (e.g., RouterService into RouterController).

**DTO Pattern:** RouterStatusDTO and PasswordChangeDTO ensure validated, structured data transfer.

**Error Handling:** Centralized error handling via errorHandler middleware prevents stack trace exposure and provides

# Installation

To run the application, follow these steps:

1. Clone the repository.
2. Move to cd router-management-api
3. Install the required packages using npm install.
4. Start the server using npm start.
5. Use a tool like Postman to send HTTP requests to the API endpoints.
6. Test using npm test

# API Endpoints

## Router Endpoints
__GET__ http://localhost:3000/router/status
__Response__
json
{
    "model": "RouterModel123",
    "firmwareVersion": "1.0.0",
    "macAddress": "AA:BB:CC:DD:EE:FF",
    "serialNumber": "SN123456789",
    "uptime": "48 hours"
}

__POST__ http://localhost:3000/router/settings/wifi/enable
__Request Body__
json
{}
__Response__
json
{
    "success": true,
    "message": "WiFi has been enabled."
}

__POST__ http://localhost:3000/router/settings/wifi/disable
__Request Body__
json
{}
__Response__
json
{
    "success": true,
    "message": "WiFi has been disabled."
}

__POST__ http://localhost:3000/router/settings/firewall/enable
__Request Body__
json
{}
__Response__
json
{
    "success": true,
    "message": "Firewall has been enabled."
}

__POST__ http://localhost:3000/router/settings/firewall/disable
__Request Body__
json
{}
__Response__
json
{
    "success": true,
    "message": "Firewall has been disabled."
}

__POST__ http://localhost:3000/router/settings/password/change
__Request Body__
json
{
    "newPassword": "newSecurePass123"
}
__Response__
json
{
    "success": true,
    "message": "Password has been changed."
}

{
    "success": false,
    "message": "DTO validation failed: New password must be at least 8 characters long."
}