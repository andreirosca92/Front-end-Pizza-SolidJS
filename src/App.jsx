import { createSignal } from "solid-js";
import "./App.module.css";

import { Route, Routes, A } from "@solidjs/router";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";

import About from "./pages/About";
import Contact from "./pages/Contact";
import { useCartContext } from "./context/CartContext";
import FormLogin from "./pages/FormLogin";
import FormRegister from "./pages/FormRegister";

const App = () => {
  const [darkTheme, setDarkTheme] = createSignal(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme());
  };
  const { items, setItems } = useCartContext();

  const quantity = () => {
    return items.reduce((acc, current) => {
      return acc + current.quantity;
    }, 0);
  };
  return (
    <div
      class="container m-auto block gap-1"
      classList={{ "bg-neutral-700": darkTheme(), "text-white": darkTheme() }}
    >
      <header class="my-auto mx-auto p-2 text-2xl flex justify-start gap-4 font-extrabold">
        <span
          class="material-symbols-outlined cursor-pointer"
          onClick={toggleTheme}
        >
          light_mode
        </span>
        <A href="/">
          <h1>Pizza Restaurant Verona</h1>
        </A>
        <A href="/">Home</A>
        <A href="/about">About us</A>
        <A href="/contact">Contact us</A>
        <A href="/cart">
          <div class="flex h-7 w-7 items-center">
            <div class="relative ">
              <div class="t-0 absolute left-2">
                <p class="flex  items-center justify-center h-5 w-5  rounded-full bg-red-500 p-3 text-xs text-white">
                  {quantity}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="file: mt-4 h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
        </A>
      </header>
      <div class="font-extrabold text-bold my-auto mx-auto p-4 text-xl flex justify-end gap-3">
        <A href="/login">Login</A>

        <A href="/register">Register</A>
      </div>

      <Routes>
        <Route path="/" component={<Home darkTheme={darkTheme} />} />{" "}
        <Route path="/cart" component={Cart} />{" "}
        <Route path="/about" component={About} />{" "}
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={FormLogin} />
        <Route path="/register" component={FormRegister} />
        <Route path="/product/:id" component={Product} />{" "}
      </Routes>
    </div>
  );
};

export default App;
