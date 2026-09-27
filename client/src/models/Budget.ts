export interface Budget {
  bid: number;
  amountUsed: string;
  maxAmount: string;
  category: string;
  month: string;
  uid: string;
}

export interface BudgetFormData {
  bid?: number;
  amountUsed: string;
  maxAmount: string;
  category: string;
  month: string;
}
