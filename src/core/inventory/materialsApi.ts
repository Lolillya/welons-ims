import axios from "axios";

export type Material = {
  id: number;
  name: string;
  category?: string;
  color?: string;
  desc?: string | null;
  quantity: number;
  remarks?: string | null;
  specs?: string;
  srp?: string;
  unit?: string;
};

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
