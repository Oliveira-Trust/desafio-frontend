import type { User } from "@/types/user.type";
import { makeRequest } from "@/utils/request.utils";

export async function getUsers(queryString: string): Promise<{ data: User[], items: number}> {
  const response = await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT + queryString);

  return response.json();
}
