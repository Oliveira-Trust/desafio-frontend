import type { User } from "@/types/user.type";
import { makeRequest } from "@/utils/request.utils";

export async function getPaginatedUsersRequest(queryString: string): Promise<{ data: User[], items: number}> {
  const response = await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT + queryString);

  const data = await response.json();
  const items = parseInt(response.headers.get('X-Total-Count') ?? '0') ;

  return { data, items };
}

export async function getUsersRequest(): Promise<User[]> {
  const response = await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT);

  return response.json();
}

export async function deleteUserRequest(id: number): Promise<void> {
  await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT + `/${id}`, { method: 'DELETE' });
}

export async function createUserRequest(user: Omit<User, 'id'>): Promise<void> {
  await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT, { method: 'POST', body: JSON.stringify(user) });
}

export async function updateUserRequest(id: number, user: Omit<User, 'id'> & { id?: number }): Promise<void> {
  await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT + `/${id}`, { method: 'PUT', body: JSON.stringify(user) });
}
