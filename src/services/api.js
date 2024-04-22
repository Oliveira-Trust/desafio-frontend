export const fetchUserData = async (nome, sobrenome, email) => {
  const response = await fetch(`http://localhost:3004/users?nome_like=${nome}&sobrenome_like=${sobrenome}&email_like=${email}`);
  const data = await response.json();
  return data;
};

export const fetchBTCToBRL = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/last/BTC-BRL');
  const data = await response.json();
  return data;
}