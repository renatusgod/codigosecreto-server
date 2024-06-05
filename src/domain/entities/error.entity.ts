export class ErrorEntity {
  private errors: string[] = [];

  constructor() {}

  // Método para adicionar erros de validação à lista
  addValidationError(error: string): void {
    this.errors.push(error);
  }

  // Método para limpar a lista de erros de validação
  clearValidationErrors(): void {
    this.errors = [];
  }

  // Método para obter a lista de erros de validação
  get validationErrors(): string[] {
    return this.errors;
  }

  // Método para verificar se há erros de validação
  hasValidationErrors(): boolean {
    return this.errors.length > 0;
  }

  // Método abstrato para validar a entidade
  validate(): void {
    throw new Error("Method 'validate' must be implemented in derived classes");
  }
}
