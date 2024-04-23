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

export const fetchNewWallet = async (wallet) => {
  const response = await fetch('http://localhost:3004/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wallet)
  });
  const data = await response.json();
  return data;
}

export const fetchEditWallet = async (id, wallet) => {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(wallet)
  });
  const data = await response.json();
  return data;
}

export const fetchDeleteWallet = async (id) => {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data;
}