export interface Transaction {
  tid: number;
  description: string;
  date: string;
  amount: number;
  type: string;
  category: string;
  uid: number;
}

export interface TransactionFormData {
  tid?: number;
  description: string;
  date: string;
  amount: string;
  type: "income" | "expense";
  category: string;
}
