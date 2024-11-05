import { Breed } from "@/@types/cat";
import { api } from "@/lib/axios";

export async function fetchBreeds() {
  try {
    const response = await api.get<Breed[]>('/breeds')
    return response.data
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return []
  }
}
