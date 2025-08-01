import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter } from "react-router-dom";

import "primeicons/primeicons.css";
import NavbarComponent from "./component/navbar/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
      <BrowserRouter>
        <div className="min-h-screen">
          <NavbarComponent />
          <App />
        </div>
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
);
