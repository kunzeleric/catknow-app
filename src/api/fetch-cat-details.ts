import { CatProps } from "@/@types/cat";
import { api } from "@/lib/axios";


export async function fetchCatDetails(catId: string) {
  try {
    const response = await api.get<CatProps>(`/images/${catId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching cat details:", error);
    return null
  }
}