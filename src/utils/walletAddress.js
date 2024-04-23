export const createWalletAddress = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 34; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}