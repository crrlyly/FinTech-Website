import type { BudgetFormData } from "../models/Budget";

const API_URL: string = "http://localhost:5000/api/budget";

export async function getBudgets() {
  const res = await fetch(`${API_URL}/`, {
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Request to fetch budgets failed with status ${res.status}`,
    );
  }

  return data;
}

export async function getCurrBudgets() {
  const res = await fetch(`${API_URL}/curr`, {
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Request to fetch budgets failed with status ${res.status}`,
    );
  }

  return data;
}

export async function createNewBudgets() {
  const res = await fetch(`${API_URL}/`, {
    credentials: "include",
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Unable to create new budgets for the month");
  }

  return res.json();
}

export async function updateBudgets(formData: BudgetFormData) {
  console.log(formData);
  const res = await fetch(`${API_URL}/${formData.bid}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}
