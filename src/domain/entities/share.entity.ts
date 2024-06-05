import { BaseEntity } from "./base.entity";

export class Share extends BaseEntity {
  title: string;
  investorId: string;

  constructor(title: string, investorId: string) {
    super();

    this.validateShare(title, investorId);

    if (this.hasValidationErrors())
      return;

    this.title = title;
    this.investorId = investorId;
  }

  updateTitle(title: string): void {
    this.validateTitle(title);

    if (this.hasValidationErrors())
      return;

    this.title = title;
  }

  validate(): void {
    this.validateShare(
      this.title,
      this.investorId,
    );
  }

  private validateShare(title: string, investorId: string): void {
    this.clearValidationErrors();

    this.validateTitle(title);
    this.validateInvestorId(investorId);
  }

  private validateTitle(title: string): void {
    if (!title) {
      this.addValidationError("Title is required");
    }
  }

  private validateInvestorId(investorId: string) {
    if (!investorId) {
      this.addValidationError("InvestorId is required");
    }
  }
}