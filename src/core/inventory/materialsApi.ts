import axios from "axios";

export type Material = {
  id: number;
  sku: string;
  name: string;
  stock: number;
  // backend might use snake_case; we accept either
  reorder_level?: number;
  reorderLevel?: number;
};

// When developing with Vite we want to use the dev server proxy
// so requests are same-origin and avoid CORS errors. If an explicit
// VITE_API_BASE_URL is provided, use it; otherwise use a relative
// `/api` path which Vite will proxy to the backend.
const ENV_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchMaterials(): Promise<Material[]> {
  const url = ENV_BASE ? `${ENV_BASE}/api/material/all` : "/api/material/all";
  try {
    const response = await axios.get<Material[]>(url);

    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response format: expected array");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Fetch error ${error.response?.status}: ${error.message}`
      );
    } else {
      throw new Error(`An unexpected error occurred: ${error}`);
    }
  }
}
