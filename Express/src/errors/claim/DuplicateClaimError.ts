export class DuplicateClaimError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateClaimError';
  }
}

// Ensure the file is recognized as a module
export {};