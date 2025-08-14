import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/shared/header/Header";
import { ModalProvider } from "./context/ModalContext";
import { ToastProvider } from "./components/shared/toast/Toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);


const App = () => {
  return (
    <ToastProvider>
      <ModalProvider>
        <div className="bg-gray-100 min-h-screen">
          <Header />
          <div className="px-10 mt-12 m-auto container">
            <RouterProvider router={router} />
          </div>
        </div>
      </ModalProvider>
    </ToastProvider>
  );
};

export default App;
