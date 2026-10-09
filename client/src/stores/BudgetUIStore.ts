import { create } from "zustand";
import type { User } from "../models/User";
import { updateUser } from "../services/authApi";

type BudgetUIStore = {
  activateBudget: boolean;
  activateEveryMonth: boolean;
  loadInitialValues: (user: User | null) => void;
  toggleActivateBudgets: (user: User | null) => Promise<void>;
  toggleActivateEveryMonthFromUser: (user: User | null) => Promise<void>;
};

export const useBudgetUIStore = create<BudgetUIStore>((set, get) => ({
  activateBudget: false,
  activateEveryMonth: false,

  //call this in a useEffect in Budget ONCE
  loadInitialValues: (user) => {
    if (!user) {
      return;
    }
    set({
      activateBudget: user.activateBudget,
      activateEveryMonth: user.autoActivateBudget,
    });
  },


  toggleActivateBudgets: async (user) => {
    if (!user) {
      return;
    }
    try {
      const state = get();
      const newActivateBudget = !state.activateBudget;

      await updateUser(user.name, user.email, false, newActivateBudget);

      // update the variables in this store
      set({
        activateBudget: newActivateBudget,
        activateEveryMonth: false,
      });
    } catch (error) {
      console.error(error);
    }
  },
  
  toggleActivateEveryMonthFromUser: async (user) => {
    if (!user) {
      return;
    }
    try {
      const state = get();
      const newActivateEveryMonth = !state.activateEveryMonth;

      await updateUser(
        user.name,
        user.email,
        newActivateEveryMonth,
        state.activateBudget,
      );

      set({
        activateEveryMonth: newActivateEveryMonth,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
