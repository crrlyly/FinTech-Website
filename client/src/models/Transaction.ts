export interface Transaction {
  tid: number;
  name: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  uid?: number;
}

export interface TransactionFormData {
  tid?: number;
  name: string;
  date: string;
  amount: string;
  type: "income" | "expense";
  category: string;
}
