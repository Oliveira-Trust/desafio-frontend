export const fetchUserData = async (nome, sobrenome, email) => {
  const response = await fetch(`http://localhost:3004/users?nome_like=${nome}&sobrenome_like=${sobrenome}&email_like=${email}`);
  const data = await response.json();
  return data;
};