/* @refresh reload */
import { render } from "solid-js/web";
// import { Provider } from "react-redux";
// import store from "./store/index.js";
import "./index.css";
import App from "./App";
import { Router } from "@solidjs/router";
import { CartContextProvider } from "./context/CartContext";
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

render(
  () => (
    <Router>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </Router>
  ),
  root
);
