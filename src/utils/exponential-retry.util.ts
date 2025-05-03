import { sleep } from './sleep.util';

export async function exponentialRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelayMs: number = 2000,
): Promise<T> {
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
