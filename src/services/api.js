export async function getWallets(page = 1, limit = 5) {
  const response = await fetch(
    `http://localhost:3004/users?_page=${page}&_limit=${limit}`
  );
  const data = await response.json();
  const total = response.headers.get("X-Total-Count");

  return { data, total };
}
