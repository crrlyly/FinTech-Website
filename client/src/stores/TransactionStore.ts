import { create } from "zustand";
import type { Transaction, TransactionFormData } from "../models/Transaction";
import {
  deleteTransaction,
  getTransactions,
  addTransaction,
  updateTransaction,
} from "../services/transactionApi";

type TransactionStore = {
  transactions: Transaction[];
  loadStoreTransactions: () => Promise<void>;
  addStoreTransactions: (formData: TransactionFormData) => Promise<void>;
  updateStoreTransaction: (formData: TransactionFormData) => Promise<void>;
  deleteStoreTransaction: (tid: number) => Promise<void>;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  loadStoreTransactions: async () => {

    try {
      const { transactions } = await getTransactions();

      set({ transactions });
    } catch (error) {
      console.error(error);
    }
  },

  addStoreTransactions: async (formData) => {
    try {
      await addTransaction(formData);

      const { transactions } = await getTransactions();

      set({ transactions });
    } catch (error) {
      console.error(error);
    }
  },

  updateStoreTransaction: async (formData) => {
    try {
      await updateTransaction(formData);

      const { transactions } = await getTransactions();

      set({ transactions });
    } catch (error) {
      console.error(error);
    }
  },

  deleteStoreTransaction: async (tid) => {
    try {
      await deleteTransaction(tid);

      const { transactions } = await getTransactions();

      set({ transactions });
    } catch (error) {
      console.error(error);
    }
  },
}));
