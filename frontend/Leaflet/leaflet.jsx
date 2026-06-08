import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./leaflet-app";
import { supabase } from "./supabaseClient";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
