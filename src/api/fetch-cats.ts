import { CatProps } from "@/@types/cat";
import { api } from "@/lib/axios";

export async function fetchCats() {
  try {
    const response = await api.get<CatProps[]>("/images/search", {
      params: {
        limit: 25,
        has_breeds: true,
        order: "desc",
        mime_types: "jpg,png",
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cats data:", error);
    return []
  }
}
