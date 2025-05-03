# NestJS Common

[![npm version](https://img.shields.io/npm/v/@furkanogutcu/nest-common.svg)](https://www.npmjs.com/package/@furkanogutcu/nest-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A module containing common structures and utilities for NestJS projects.

## Contents

This package is designed to standardize structures you repeatedly use in your NestJS projects and to accelerate the development process.

- [Installation](#installation)
- [Features](#features)
  - [Exceptions](#1-exceptions)
  - [API Responses](#2-api-responses)
  - [Validators and Pipes](#3-validators-and-pipes)
  - [Decorators](#4-decorators)
  - [Utilities](#5-utilities)
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

  | Exception Class                   | HTTP Status | Description                                        |
  | --------------------------------- | ----------- | -------------------------------------------------- |
  | `AppException`                    | -           | Base exception class for all custom exceptions     |
  | `AppBadRequestException`          | 400         | For invalid input, malformed requests              |
  | `AppUnauthorizedException`        | 401         | For authentication failures                        |
  | `AppForbiddenException`           | 403         | For authorization failures                         |
  | `AppNotFoundException`            | 404         | For resources that couldn't be found               |
  | `AppConflictException`            | 409         | For conflicting requests (e.g., duplicate entries) |
  | `AppUnprocessableEntityException` | 422         | For semantically incorrect requests                |
  | `AppInternalException`            | 500         | For server-side errors                             |
  | `AppTooManyRequestException`      | 429         | For rate limiting scenarios                        |
  | `AppValidationException`          | 400         | Specifically for input validation errors           |

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

### 2. API Responses

#### Features

- **Standardized Response Types**: Comprehensive set of response interfaces for consistent API responses.
  - `APIResponse`: Generic type for creating standardized responses
  - `APIResponseOnlyMessage`: Simple message-only response
  - `PaginatedAPIResponse`: Response format for paginated data with metadata

#### Usage

```typescript
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  APIResponse,
  APIResponseOnlyMessage,
  PaginatedAPIResponse,
  Pagination,
  PaginationParams,
} from '@furkanogutcu/nest-common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Pagination() { skip, take }: PaginationParams): Promise<PaginatedAPIResponse<User>> {
    const { items, metadata } = await this.usersService.findAll({ skip, take });

    return {
      data: items,
      metadata,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<APIResponse<'user', User>> {
    const user = await this.usersService.findOne(id);

    return {
      user,
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<APIResponseOnlyMessage> {
    await this.usersService.create(createUserDto);

    return {
      message: 'User created successfully',
    };
  }
}
```

### 3. Validators and Pipes

#### Features

- **Zod Validation Pipe**: Extended validation pipe for NestJS using Zod schema validation.

  - Seamless integration with NestJS validation pipeline
  - Throws consistent `AppValidationException` on validation errors
  - Compatible with Zod schemas

- **Common Validation Schemas**:
  - `paginationSchema`: For standardizing pagination parameters
  - `orderBySchema`: For standardizing sorting/ordering parameters
  - `searchSchema`: For standardizing search parameters

#### Usage

##### Setting up validation globally

```typescript
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppZodValidationPipe } from '@furkanogutcu/nest-common';

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
      provide: APP_PIPE,
      useClass: AppZodValidationPipe,
    },
  ],
})
export class AppModule {}
```

### 4. Decorators

#### Features

- **Parameter Decorators**: Decorators for common query parameter extraction and validation.
  - `@Pagination()`: Extracts and validates pagination parameters
  - `@OrderBy()`: Extracts and validates ordering parameters
  - `@Search()`: Extracts and validates search parameters

#### Usage

```typescript
import { Controller, Get } from '@nestjs/common';
import { Pagination, OrderBy, Search, PaginationParams, OrderByParam, SearchParams } from '@furkanogutcu/nest-common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(
    @Pagination() { skip, take }: PaginationParams,
    @OrderBy<User>(['created_at']) orderBy: OrderByParam<User>,
    @Search<User>(['email']) search: SearchParams<User>,
  ) {
    // Implement your service call with these validated parameters
    return this.usersService.findAll({ skip, take, orderBy, where: search });
  }
}
```

### 5. Utilities

#### Features

- **Asynchronous Utilities**:
  - `exponentialRetry`: Retry a function with exponential backoff
  - `sleep`: Simple promise-based delay utility

#### Usage

```typescript
import { exponentialRetry, sleep } from '@furkanogutcu/nest-common';

// Retry a function with exponential backoff
async function fetchWithRetry() {
  return exponentialRetry(
    async () => {
      // Potentially failing operation (e.g., API call)
      return await externalApiCall();
    },
    {
      maxAttempts: 5, // Maximum of 5 attempts
      baseDelayMs: 1000, // Starting delay of 1000ms (will grow exponentially)
    },
  );
}

// Simple delay utility
async function processWithDelay() {
  await sleep(2000); // Wait for 2 seconds
  // Continue execution
}
```

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
