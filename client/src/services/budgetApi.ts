const API_URL: string = "http://localhost:5000/api/budget";

export async function getBudgets() {
  const res = await fetch(`${API_URL}/`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

// export async function updateBudgets(gid: number, formData: BudgetFormData) {
//   const res = await fetch(`${API_URL}/:gid`, {
//     method: "PATCH",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || `Request failed with status ${res.status}`);
//   }

//   return data;
// }
