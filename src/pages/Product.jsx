import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { Show } from "solid-js";
import { createSignal } from "solid-js";
import { useCartContext } from "../context/CartContext";
import Footer from "../components/Footer/Footer";
const fetchProduct = async (id) => {
  const res = await fetch("http://localhost:4000/products/" + id);
  return res.json();
};

const Product = () => {
  function displayFormattedProductCount() {
    return productCount() > 0 ? productCount() : "zero";
  }
  const [productCount, updateCount] = createSignal(0);
  const incrementProductCount = function () {
    // console.log(productCount);
    updateCount(productCount() + 1);
  };
  const decrementProductCount = function () {
    // console.log(productCount);
    if (productCount() > 0) {
      updateCount(productCount() - 1);
    } else {
      updateCount(productCount());
    }
  };
  const params = useParams();
  const [product] = createResource(params.id, fetchProduct);
  const { items, setItems } = useCartContext();

  const [adding, setAdding] = createSignal(false);

  const addProduct = () => {
    setAdding(true);
    setTimeout(() => setAdding(false), 2000);

    const exists = items.find((p) => p.id === product().id);
    console.log(exists);
    if (exists) {
      setItems(
        (p) => p.id === product().id,
        "quantity",
        (q) => q + productCount()
      );
    } else if (!exists) {
      setItems([...items, { ...product(), quantity: productCount() }]);
    }
  };

  return (
    <div class="my-7">
      <Show when={product()} fallback={<p>Loading...</p>}>
        <div class="grid grid-cols-5 gap-7">
          <div class="col-span-2">
            <img src={product().img} alt="product image" />
          </div>
          <div class="col-span-3">
            <h2 class="text-3xl font-bold mb-7">{product().title}</h2>
            <p>{product().Ingredienti}</p>
            <p class="my-7 text-2xl">€ {product().prezzo}</p>
            <button class="btn" onClick={decrementProductCount}>
              -
            </button>
            <span class="bg-slate-50  text-black font-bold text-center px-2 py-4 rounded-md ">
              {displayFormattedProductCount()}
            </span>
            <button class="btn" onClick={incrementProductCount}>
              +
            </button>
            <div class="flex flex-row">
              <button
                class="bg-amber-500
    py-2 px-3 my-2 
    text-white
    rounded-md
    border-2 
    border-amber-600 "
                onClick={addProduct}
                disabled={adding()}
              >
                Add to Cart
              </button>
              <Show when={adding()}>
                <div class="py-2 px-3 my-2 mx-2  border-amber-500 border-2 rounded-md inline-block">
                  {productCount()}x {product().title} was added to the cart
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>
      <Footer />
    </div>
  );
};

export default Product;
