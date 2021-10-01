export async function getCurrentBtcValue() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/BTC-BRL"
  );
  const data = await response.json();

  return parseInt(data.BTCBRL.ask.replace(".", ""));
}
