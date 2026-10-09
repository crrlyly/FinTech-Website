export interface Budget {
  bid: number;
  maxAmount: string;
  category: string;
  uid: string;
  date?: string;
}

export interface BudgetFormData {
  bid: number;
  maxAmount: string;
  category: string;
}
