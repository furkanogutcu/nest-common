# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-05-02

### Added

- Initial release of `@furkanogutcu/nest-common`
- Exception handling module with standardized exceptions:
  - AppException - Base exception class
  - BadRequestException
  - ConflictException
  - ForbiddenException
  - InternalException
  - NotFoundException
  - TooManyRequestException
  - UnauthorizedException
  - UnprocessableEntityException
  - ValidationException
- Exception filters for handling exceptions in NestJS applications

### Dependencies

- Requires NestJS v11.1.0 or higher
- Compatible with Zod v3.24.3
- Optional TypeORM integration (v0.3.22)
