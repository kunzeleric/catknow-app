import { api } from "@/lib/axios";

type CategoryProps = {
  id: number
  name: string
}

export async function fetchCategories() {
  try {
    const response = await api.get<CategoryProps[]>('/categories')
    return response.data
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return null
  }
}
