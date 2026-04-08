import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ServiceProvider } from "./providers/ServiceProvider.js";
import { queryClient } from "./shared/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ServiceProvider>
          <App />
        </ServiceProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
