export interface CreateExpectationRequest {
  description: string;
  shareId: string;
  investorId: string;
}

export interface CreateExpectationResponse {
  id: string;
  shareId: string;
  description: string;
  errors: string[];
}

export interface GetExpectationsRequest {
  shareId: string;
  investorId: string;
}

export interface GetExpectationsResponse {
  id: string;
  description: string;
  shareId: string;
}