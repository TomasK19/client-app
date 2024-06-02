export interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
      errors?: Record<string, string[]>;
    };
  };
}
