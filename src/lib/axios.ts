import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
  },
  params: {
    mime_types: ["image/jpg", "image/png"],
    has_breeds: true,
  },
});
