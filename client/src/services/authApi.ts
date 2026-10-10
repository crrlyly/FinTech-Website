import type { SignupCardFormDataProps } from "../components/home/signup/SignupCard.tsx";
import type { LoginFormDataProps } from "../components/home/login/LoginCard.tsx";
import type { User } from "../models/User.ts";

const API_URL = "http://localhost:5000/api/auth";
// const HOST_API_URL = "http://192.168.1.154:5173/";

export interface AuthResponse {
  message: string;
  user: User;
}

export async function signUp(formData: SignupCardFormDataProps) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function login(
  formData: LoginFormDataProps,
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/currentUser`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Unable to fetch current user");
  }

  
  return res.json();
}

export async function updateUser(
  name: string,
  email: string,
  autoActivateBudget: boolean,
  activateBudget: boolean,
) {
  const res = await fetch(`${API_URL}/`, {
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify({ name, email, autoActivateBudget, activateBudget }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Unable to update user");
  }
  return res.json();
}
