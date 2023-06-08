import Card from "../components/Card/Card";
import { For } from "solid-js";
import { useCartContext } from "../context/CartContext";

const Cart = () => {
  const { items, setItems } = useCartContext();
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
  const total = () => {
    return items.reduce((acc, p) => {
      return acc + p.quantity * p.prezzo;
    }, 0);
  };
  return (
    <Show when={items} fallback={<p>Loading...</p>}>
      <div class="container m-auto block gap-1">
        <Card rounded={true}>
          <h2 class="text-black text-2xl font-bold">Your Shopping Cart</h2>
          <For each={items}>
            {(value) => (
              <div class="max-w-lg max-h-lg my-8 mx-10 py-10 px-10 gap-2">
                <div class="grid justify-items-center">
                  <p class="my-6 mx-3 p-4 text-black text-xl self-center ">
                    {value.quantity}x
                  </p>
                  <img
                    class="mx-3 my-2"
                    src={value.img}
                    alt="product image"
                    width={140}
                    height={140}
                  />

                  <p class="my-4 mx-3 p-1 text-black text-xl self-center">
                    {value.title}
                  </p>
                  <span class="my-4 mx-3 p-1 text-black text-x inline-flex">
                    € {value.prezzo}
                  </span>
                  <button
                    onclick={() => cancelOrder(value.id)}
                    type="button"
                    class="bg-white rounded-md p-2  text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span class="sr-only">Cancel Order</span>
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </For>
          <p class="mt-8 pt-4 border-t-2 font-bold text-black">
            Prezzo Totale - € {total()}
          </p>
        </Card>
        <Card rounded={true}>
          <button class="btn" onClick={cancelSubmit}>
            Cancella l'ordine
          </button>
        </Card>
        <Card rounded={true}>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submitCheckOut}
          >
            Check out
          </button>
        </Card>
      </div>
    </Show>
  );
};
export default Cart;
