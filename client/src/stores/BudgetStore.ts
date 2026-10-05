import { create } from "zustand";
import type { Budget, BudgetFormData } from "../models/Budget";
import { getBudgets, updateBudgets } from "../services/budgetApi";

type BudgetStore = {
  budgets: Budget[];
  loadStoreBudgets: () => Promise<void>;
  updateStoreBudgets: (formData: BudgetFormData) => Promise<void>;
};

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: [],
  loadStoreBudgets: async () => {
    try {
      const { budgets } = await getBudgets();
      set({ budgets });
    } catch (error) {
      console.error(error);
    }
  },
  updateStoreBudgets: async (formData) => {
    try {
      await updateBudgets(formData);
      const { budgets } = await getBudgets();
      set({ budgets });
    } catch (error) {
      console.error(error);
    }
  },
}));
