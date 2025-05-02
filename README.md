# NestJS Common

[![npm version](https://img.shields.io/npm/v/@furkanogutcu/nest-common.svg)](https://www.npmjs.com/package/@furkanogutcu/nest-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A module containing common structures and utilities for NestJS projects.

## Contents

This package is designed to standardize structures you repeatedly use in your NestJS projects and to accelerate the development process.

- [Installation](#installation)
- [Features](#features)
  - [Exceptions](#1-exceptions)
- [Development](#development)
- [License](#license)

## Installation

```bash
npm install @furkanogutcu/nest-common
```

or

```bash
yarn add @furkanogutcu/nest-common
```

## Features

### 1. Exceptions

#### Installation

No additional installation steps are needed beyond installing the package.

#### Features

- **Custom Exception Classes**: Comprehensive set of HTTP-based exception classes for consistent error responses.

  | Exception Class | HTTP Status | Description |
  |-----------------|-------------|-------------|
  | `AppException` | - | Base exception class for all custom exceptions |
  | `AppBadRequestException` | 400 | For invalid input, malformed requests |
  | `AppUnauthorizedException` | 401 | For authentication failures |
  | `AppForbiddenException` | 403 | For authorization failures |
  | `AppNotFoundException` | 404 | For resources that couldn't be found |
  | `AppConflictException` | 409 | For conflicting requests (e.g., duplicate entries) |
  | `AppUnprocessableEntityException` | 422 | For semantically incorrect requests |
  | `AppInternalException` | 500 | For server-side errors |
  | `AppTooManyRequestException` | 429 | For rate limiting scenarios |
  | `AppValidationException` | 400 | Specifically for input validation errors |

- **Global Exception Filter**: Automatically catches and transforms exceptions throughout your application.
  - Centralized error handling logic
  - Consistent error response format
  - Easy to configure through NestJS's dependency injection

- **Exception Transformers**: Converts various error types to standardized app exceptions.
  - NestJS built-in exception transformer
  - TypeORM exception transformer

- **Structured Error Responses**: All exceptions follow a consistent JSON structure for frontend consumption.
  - Consistent error format across your entire API
  - Detailed validation error information
  - Type-safe error codes for easy client-side handling

#### Usage

##### Setup

To use the exception handling system globally in your NestJS application, you need to configure the `GlobalExceptionFilter` in your main module (e.g., `app.module.ts`):

```typescript
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@furkanogutcu/nest-common';

@Module({
  imports: [
    // Your other modules
  ],
  controllers: [
    // Your controllers
  ],
  providers: [
    // Your other providers
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
```

##### Exception Example

```typescript
import { AppBadRequestException } from '@furkanogutcu/nest-common';

throw new AppBadRequestException({
  message: 'Invalid request parameter',
  code: 'BAD_REQUEST',
});
```

##### JSON Error Response Example

When an exception is thrown, the NestJS global exception filter can convert it to a JSON response using the `toJSON()` method. Here's an example of the JSON structure returned:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid request parameter"
  }
}
```

For validation errors, additional details are provided:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "Validation failed",
    "details": [
      {
        "type": "invalid",
        "path": "email",
        "message": "Email must be a valid email address"
      },
      {
        "type": "missing_field",
        "path": "password",
        "message": "Password is required"
      }
    ]
  }
}
```

The `type` field in validation error details can have the following values:

| Type Value       | Description                                                   |
| ---------------- | ------------------------------------------------------------- |
| `already_exists` | When a field value already exists (e.g., duplicate email)     |
| `invalid`        | When a field value is not valid according to validation rules |
| `missing_field`  | When a required field is missing                              |
| `unrecognized`   | When a field is not recognized or not allowed                 |

##### Additional Components

For more detailed information about the filters, transformers, and interfaces included in the exceptions package, please check the source code.

## Development

### Requirements

- Node.js 18+
- npm or yarn

### Getting Started

```bash
# Clone the repository
git clone https://github.com/furkanogutcu/nest-common.git

# Install dependencies
npm install

# Start in development mode
npm run start:dev
```

### Commands

- `npm run build`: Compiles the project
- `npm run format`: Formats the code
- `npm run lint`: Checks code quality
- `npm run test`: Runs tests

## License

This project is licensed under the [MIT License](LICENSE).
