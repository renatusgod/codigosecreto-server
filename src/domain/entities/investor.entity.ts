import { BaseEntity } from "./base.entity";

export class Investor extends BaseEntity {
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    super();

    this.validateInvestor(name, lastname, email, password );

    if (this.hasValidationErrors())
      return;

    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
  
  get Fullname() {
    return `${this.name} ${this.lastname}`;
  }

  get Email() {
    return this.email;
  }

  get Name() {
    return this.name;
  }

  get LastName() {
    return this.lastname;
  }

  get Password() {
    return this.password;
  }

  updateName(name: string): void {
    this.validateName(name);

    if (this.hasValidationErrors())
      return;

    this.name = name;
  }

  updateLastname(lastname: string): void {
    this.validateLastname(lastname);

    if (this.hasValidationErrors())
      return;

    this.lastname = lastname;
  }

  validate(): void {
    this.validateInvestor(
      this.name,
      this.lastname,
      this.email,
      this.password,
    );
  }

  private validateInvestor(name: string, lastname: string, email: string, password: string): void {
    this.clearValidationErrors();

    this.validateName(name);
    this.validateLastname(lastname);
    this.validateEmail(email);
    this.validatePassword(password);
  }

  private validateName(name: string): void {
    if (!name) {
      this.addValidationError("Name is required");
    }
  }

  private validateLastname(lastname: string): void {
    if (!lastname) {
      this.addValidationError("Lastname is required");
    }
  }

  private validateEmail(email: string): void {
    if (!email) {
      this.addValidationError("Email is required");
    } else if (!this.isValidEmail(email)) {
      this.addValidationError("Invalid email format");
    }
  }

  private validatePassword(password: string): void {
    if (!password) {
      this.addValidationError("Password is required");
    }
  }

  private isValidEmail(email: string): boolean {
    // Lógica de validação de e-mail
    return /\S+@\S+\.\S+/.test(email);
  }
}