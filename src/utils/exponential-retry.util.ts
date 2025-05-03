import { sleep } from './sleep.util';

export interface ExponentialRetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
}

export async function exponentialRetry<T>(fn: () => Promise<T>, options?: ExponentialRetryOptions): Promise<T> {
  const maxAttempts = options?.maxAttempts ?? 3;
  const baseDelayMs = options?.baseDelayMs ?? 2000;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxAttempts) throw lastError;

      const delay = Math.pow(2, attempt) * baseDelayMs;

      await sleep(delay);
    }
  }

  throw lastError || new Error('Unknown error');
}
