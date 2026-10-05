import type { Goal } from "../models/Goal";

export function savedInGoals(goals: Goal[]): number {
  return goals.reduce((a, g) => {
    a += Number(g.currAmount);
    return a;
  }, 0);
}
