import { BaseEntity } from "./base.entity";

export class Expectation extends BaseEntity {
  description: string;
  shareId: string;
  investorId: string;

  constructor(description: string, shareId: string, investorId: string) {
    super();

    this.validateExpectation(description, shareId, investorId);

    if (this.hasValidationErrors())
      return;

    this.description = description;
    this.shareId = shareId;
    this.investorId = investorId;
  }

  updateDescription(description: string): void {
    this.validateDescription(description);

    if (this.hasValidationErrors())
      return;

    this.description = description;
  }

  validate(): void {
    this.validateExpectation(
      this.description,
      this.shareId,
      this.investorId,
    );
  }

  private validateExpectation(description: string, shareId: string, investorId: string): void {
    this.clearValidationErrors();

    this.validateDescription(description);
    this.validateShareId(shareId);
    this.validateInvestorId(investorId);
  }

  private validateDescription(description: string): void {
    if (!description) {
      this.addValidationError("Description is required");
    }
  }

  private validateShareId(shareId: string): void {
    if (!shareId) {
      this.addValidationError("ShareId is required");
    }
  }

  private validateInvestorId(investorId: string) {
    if (!investorId) {
      this.addValidationError("InvestorId is required");
    }
  }
}