import { CatProps } from "@/@types/cat";
import { api } from "@/lib/axios";

export async function fetchCats(breedType?: string, pageParam?: number) {
  try {
    const response = await api.get<CatProps[]>("/images/search", {
      params: {
        limit: 25,
        has_breeds: true,
        order: "DESC",
        mime_types: "jpg,png",
        breed_ids: breedType,
        page: pageParam,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cats data:", error);
    return []
  }
}
