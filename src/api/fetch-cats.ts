import { CatProps } from "@/@types/cat";
import { api } from "@/lib/axios";

export async function fetchCats() {
  try {
    const response = await api.get<CatProps[]>("/images/search");
    return response.data;
  } catch (error) {
    console.error("Error fetching cats data:", error);
    return []
  }
}
