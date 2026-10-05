import { create } from "zustand";
import type { Goal, GoalFormData } from "../models/Goal";
import { addGoal, deleteGoal, getGoals, updateGoal } from "../services/goalApi";

type GoalStore = {
  goals: Goal[];
  loadStoreGoals: () => Promise<void>;
  addStoreGoals: (formData: GoalFormData) => Promise<void>;
  updateStoreGoals: (goal: Goal) => Promise<void>;
  deleteStoreGoals: (gid: number) => Promise<void>;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  loadStoreGoals: async () => {
    try {
      const { goals } = await getGoals();
      set({ goals });
    } catch (error) {
      console.error(error);
    }
  },
  addStoreGoals: async (formData) => {
    try {
      await addGoal(formData);
      const { goals } = await getGoals();
      set({ goals });
    } catch (error) {
      console.error(error);
    }
  },
  updateStoreGoals: async (goal) => {
    try {
      await updateGoal(goal);
      const { goals } = await getGoals();
      set({ goals });
    } catch (error) {
      console.error(error);
    }
  },
  deleteStoreGoals: async (gid) => {
    try {
      await deleteGoal(gid);
      const { goals } = await getGoals();
      set({ goals });
    } catch (error) {
      console.error(error);
    }
  },
}));
