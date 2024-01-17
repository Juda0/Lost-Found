export class MessageTooShortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageTooShortError';
  }
}

// Ensure the file is recognized as a module
export {};