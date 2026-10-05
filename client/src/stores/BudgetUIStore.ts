import { create } from "zustand";
import type { User } from "../models/User";
import { updateUser } from "../services/authApi";

type BudgetUIStore = {
  activateBudget: boolean;
  activateEveryMonth: boolean;
  setActivateBudgets: (user: User | null) => Promise<void>;
  setActivateEveryMonthFromUser: (user: User | null) => void;
  updateUserActivateEveryMonth: (user: User | null) => Promise<void>;
};

export const useBudgetUIStore = create<BudgetUIStore>((set, get) => ({
  activateBudget: false,
  activateEveryMonth: false,
  setActivateBudgets: async (user) => {
    if (!user) {
      return;
    }
    try {
      const state = get();
      const newActivateBudget = !state.activateBudget;

      if (newActivateBudget === false) {
        await updateUser(user.name, user.email, false);
      }

      set({
        activateBudget: newActivateBudget,
        activateEveryMonth: newActivateBudget
          ? state.activateEveryMonth
          : false,
      });
    } catch (error) {
      console.error(error);
    }


  },
  setActivateEveryMonthFromUser: (user) => {
    if (!user) {
      return;
    }
    const value = user.autoActivateBudget;
    if (value) {
      set({ activateEveryMonth: value, activateBudget: true });
    } else {
      set({ activateEveryMonth: value });
    }
  },
  updateUserActivateEveryMonth: async (user) => {
    if (!user) {
      return;
    }

    try {
      const state = get();
      const newValue = !state.activateEveryMonth;

      await updateUser(user.name, user.email, newValue);

      if (newValue) {
        set({
          activateBudget: true,
          activateEveryMonth: true,
        });
      } else {
        set({
          activateEveryMonth: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
