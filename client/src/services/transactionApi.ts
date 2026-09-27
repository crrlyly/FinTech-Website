import type { TransactionFormData } from "../models/Transaction";

const API_URL: string = "http://localhost:5000/api/transaction";

export async function getTransactions() {
  const res = await fetch(`${API_URL}/`, {
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to fetch transactions with status ${res.status}`,
    );
  }

  return data;
}

export async function addTransaction(formData: TransactionFormData) {
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
      data.error || `Failed to add transaction with status ${res.status}`,
    );
  }

  return data;
}

export async function updateTransaction(formData: TransactionFormData) {
  const res = await fetch(`${API_URL}/${formData.tid}`, {
    method: "PATCH",
    body: JSON.stringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to update transaction with status ${res.status}`,
    );
  }

  return data;
}

export async function deleteTransaction(tid: number) {
  const res = await fetch(`${API_URL}/${tid}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error || `Failed to delete transaction with status ${res.status}`,
    );
  }

  return data;
}
