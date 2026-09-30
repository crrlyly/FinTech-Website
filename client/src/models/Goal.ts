export interface Goal {
  gid: number;
  targetDate: string;
  goalAmount: number;
  name: string;
  currAmount: number;
}

export interface GoalFormData {
  gid?: number;
  targetDate?: string;
  goalAmount: string;
  name: string;
  currAmount: string;
}
