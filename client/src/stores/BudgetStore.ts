import { create } from "zustand";
import type { Budget, BudgetFormData } from "../models/Budget";

import {
  createNewBudgets,
  getBudgets,
  updateBudgets,
} from "../services/budgetApi";

type BudgetStore = {
  allBudgets: Budget[];
  selectedMonthIndex: number;
  setSelectedMonthIndex: (index: number) => void;
  loadBudgets: () => Promise<void>;
  createNewMonthlyBudgets: () => Promise<void>;
  updateStoreBudgets: (formData: BudgetFormData) => Promise<void>;
};

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  allBudgets: [],
  
  selectedMonthIndex: 0,

  setSelectedMonthIndex: (index) => {
    set({ selectedMonthIndex: index });
  },

  loadBudgets: async () => {
    try {
      const { budgets } = await getBudgets();
      set({ allBudgets: budgets });
    } catch (error) {
      console.error(error);
    }
  },

  createNewMonthlyBudgets: async () => {
    try {
      await createNewBudgets();
      await get().loadBudgets();
    } catch (error) {
      console.error(error);
    }
  },

  updateStoreBudgets: async (formData) => {
    try {
      await updateBudgets(formData);
      await get().loadBudgets();
    } catch (error) {
      console.error(error);
    }
  },
}));
