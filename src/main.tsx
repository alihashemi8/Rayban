import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/vazirmatn";
import App from "./App";
import "./styles.css";
import "./navy.css";
import "./navigation.css";
import "./mobile.css";
import "./features.css";
import "./refinements.css";
import "./light.css";
import type { Language } from "./data";
import type { Theme } from "./components/Header";
let initialLang: Language = "fa";
let initialTheme: Theme = "dark";
try {
  if (localStorage.getItem("raiban-language") === "en") initialLang = "en";
  if (localStorage.getItem("raiban-theme") === "light") initialTheme = "light";
} catch {
  /* Preferences are optional. */
}
const application = (
  <React.StrictMode>
    <BrowserRouter>
      <App initialLang={initialLang} initialTheme={initialTheme} />
    </BrowserRouter>
  </React.StrictMode>
);
const root = document.getElementById("root")!;
if (
  root.dataset.route === window.location.pathname &&
  initialLang === "fa" &&
  initialTheme === "dark"
)
  ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);
