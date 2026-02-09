import { API_BASE_URL } from "../../shared/config.js";

export async function createOwner(payload) {
  const res = await fetch(`http://localhost:8080/api/owners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Could not create owner");
  }

  return data;
}
