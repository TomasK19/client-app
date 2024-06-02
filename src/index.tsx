import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app/App.css";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
