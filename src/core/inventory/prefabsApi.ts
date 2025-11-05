import axios from "axios";

interface Prefabs {
  available_quantity: number;
  color: string;
  desc: string | null;
  id: number;
  name: string;
  specs: string;
  srp: string;
}

const ENV_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const fetchPrefabs = async () => {
  const url = ENV_BASE ? `${ENV_BASE}/api/prefab/all` : "/api/prefab/all";

  try {
    const response = await axios.get<Prefabs[]>(url);

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e))
      throw new Error(`Fetch error ${e.response?.status}: ${e.message}`);
    else throw new Error(`An unexpected error occured: ${e}`);
  }
};
