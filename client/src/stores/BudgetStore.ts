import { create } from "zustand";
import type { Budget, BudgetFormData } from "../models/Budget";
import { getBudgets, updateBudgets } from "../services/budgetApi";

type BudgetStore = {
  budgets: Budget[];
  past4MonthsBudget: MonthlyBudget[];
  loadStoreBudgets: () => Promise<void>;
  updateStoreBudgets: (formData: BudgetFormData) => Promise<void>;
  loadPast4MonthsBudget: (budgets: Budget[]) => void;
};

interface MonthlyBudget {
  month: number;
  budget: Budget[];
}

type time = {
  month: number;
  year: number;
};

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: [],
  past4MonthsBudget: [],
  loadStoreBudgets: async () => {
    try {
      const { budgets } = await getBudgets();
      set({ budgets });
    } catch (error) {
      console.error(error);
    }
  },
  updateStoreBudgets: async (formData: BudgetFormData) => {
    try {
      await updateBudgets(formData);
      const { budgets } = await getBudgets();
      set({ budgets });
    } catch (error) {
      console.error(error);
    }
  },
  loadPast4MonthsBudget: (budgets: Budget[]) => {
    const time: Date = new Date();
    let month = time.getMonth();
    let year = time.getFullYear();
    const times: time[] = [];

    for (let i = 0; i < 4; i++) {
      times.push({ month: month, year: year });

      month -= 1;

      if (month === -1) {
        month = 11;
        year -= 1;
      }
    }

    const past4Months: MonthlyBudget[] = times.map((t) => {
      const monthBudget: Budget[] = budgets.filter(
        (b) =>
          Number(b.date?.slice(0, 4)) === t.year &&
          Number(b.date?.slice(5, 7)) === t.month + 1,
      );
      return {
        month: t.month,
        budget: monthBudget,
      };
    });
    set({ past4MonthsBudget: past4Months });
  },
}));
