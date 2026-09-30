import type { Goal, GoalFormData } from "../models/Goal";

const API_URL: string = "http://localhost:5000/api/goal";

export async function getGoals() {
  const res = await fetch(`${API_URL}/`, {
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to fetch goals with status ${res.status}`,
    );
  }

  return data;
}

export async function addGoal(formData: GoalFormData) {
  const res = await fetch(`${API_URL}/`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to add goal with status ${res.status}`,
    );
  }

  return data;
}

export async function updateGoal(goal: Goal) {
  const res = await fetch(`${API_URL}/${goal.gid}`, {
    method: "PATCH",
    body: JSON.stringify(goal),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to update goal with status ${res.status}`,
    );
  }

  return data;
}

export async function deleteGoal(gid: number) {
  const res = await fetch(`${API_URL}/${gid}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error || `Failed to delete goal with status ${res.status}`,
    );
  }

  return data;
}
