/**
 * Represents a TimeoutError.
 */
export class TimeoutError extends Error {
  /**
   * Creates a new instance of TimeoutError.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Represents an error indicating that a resource was not found.
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}