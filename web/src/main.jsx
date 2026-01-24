import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./assets/styles/index.css";
import './assets/styles/fonts.css'
import { MissionProvider } from "./context/MissionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MissionProvider>
          <App />
        </MissionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
