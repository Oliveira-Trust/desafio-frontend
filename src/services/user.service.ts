import type { User } from "@/types/user.type";
import { makeRequest } from "@/utils/request.utils";

export async function getPaginatedUsers(queryString: string): Promise<{ data: User[], items: number}> {
  const response = await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT + queryString);

  const data = await response.json();
  const items = parseInt(response.headers.get('X-Total-Count') ?? '0') ;

  return { data, items };
}

export async function getUsers(): Promise<User[]> {
  const response = await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT);

  return response.json();
}
