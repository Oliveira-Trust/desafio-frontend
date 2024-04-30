import { Header } from "./components/Header/Header";
import { Home } from "./Pages/Home/Home";
import { Footer } from "./components/Footer/Footer";

import { WalletProvider } from "./contex/walletContext.tsx";

import "./global.css";

export function App() {
  return (
    <WalletProvider>
      <Header />
      <Home />
      <Footer />
    </WalletProvider>
  );
}
