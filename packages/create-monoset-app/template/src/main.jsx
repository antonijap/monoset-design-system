import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MonosetProvider } from "@monoset/react";
import "@monoset/tokens/css";
import "@monoset/react/styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MonosetProvider>
      <App />
    </MonosetProvider>
  </StrictMode>,
);
