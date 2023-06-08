import { For } from "solid-js";
import { useCartContext } from "../context/CartContext";

const Cart_v2 = () => {
  const { items, setItems } = useCartContext();

  const increment = (product) => {
    if (product.quantity >= 0) {
      setItems(
        (p) => p.id === product.id,
        "quantity",
        (q) => q + 1
      );
      // limit restaurant
    } else if (product.quantity <= 1000) {
      setItems((p) => p.id === product.id, "quantity", 1000);
    }
  };
  const decrement = (product) => {
    if (product.quantity > 0) {
      setItems(
        (p) => p.id === product.id,
        "quantity",
        (q) => q - 1
      );
    } else {
      setItems(
        (p) => p.id === product.id,
        "quantity",
        (q) => q
      );
    }
  };
  const cancelSubmit = () => {
    setItems([]);
  };
  const cancelOrder = (id) => {
    const flitraggio = items.filter((item) => item.id !== id);
    setItems([...flitraggio]);
  };
  const submitCheckOut = () => {
    console.log("Chiamare stripe");
  };
  const changeHandle = (e, product) => {
    if (e.target.value > 0) {
      setItems(
        (p) => p.id === product.id,
        "quantity",
        (q) => e.target.value
      );
    } else if (e.target.value <= 1000) {
      setItems(
        (p) => p.id === product.id,
        "quantity",
        (q) => e.target.value
      );
    }
  };
  const subtotal = () => {
    return items.reduce((acc, p) => {
      return acc + p.quantity * p.prezzo;
    }, 0);
  };
  const total = () => {
    let test = subtotal();
    if (test >= 1 && test < 20) {
      return subtotal() + 5.0;
    } else if (test >= 20) {
      return subtotal();
    } else {
      return 0.0;
    }
  };
  return (
    <div class="h-screen bg-gray-100 pt-20 text-black">
      <h1 class="mb-10 text-center text-2xl font-bold">Carello</h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg md:w-2/3">
          <For each={items}>
            {(value) => (
              <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={value.img}
                  alt="product-image"
                  class="w-full rounded-lg sm:w-40"
                />
                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">
                      {value.title}
                    </h2>
                  </div>
                  <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                      <button
                        type="button"
                        onClick={() => decrement(value)}
                        class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <input
                        class="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        onKeyUp={(e) => changeHandle(e, value)}
                        value={value.quantity}
                      />
                      <button
                        type="button"
                        onClick={() => increment(value)}
                        class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div class="flex items-center space-x-4">
                      <p class="text-xl">€ {value.prezzo}</p>
                      <button onClick={() => cancelOrder(value.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>

        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotale</p>
            <p class="text-gray-700">{subtotal()}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Spese di Spedizione (&lt;€20)</p>
            <p class="text-gray-700">
              {subtotal() === 0 || subtotal() >= 20 ? "€ 0" : "€ 5"}
            </p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Totale</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">€ {total()} EUR</p>
              <p class="text-sm text-gray-700">IVA inclusa</p>
            </div>
          </div>
          <button
            onClick={submitCheckOut}
            class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out
          </button>
          <button
            onClick={cancelSubmit}
            class="mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-red-600"
          >
            Cancel order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart_v2;
