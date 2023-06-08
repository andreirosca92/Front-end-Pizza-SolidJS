import { createResource } from "solid-js";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { For } from "solid-js";
import Banner from "../components/Banner/Banner";
const fetchProducts = async () => {
  const res = await fetch("http://localhost:4000/products");
  return res.json();
};

const Home = ({ darkTheme }) => {
  const [products] = createResource(fetchProducts);
  // console.log(products)

  return (
    <div class="w-auto h-auto">
      <Banner />
      <div class="wrapper mx-auto my-auto grid grid-cols-3 gap-4 antialiased">
        <Show when={products()} fallback={<p>Loading...</p>}>
          <For each={products()}>
            {(product) => (
              <div
                class="px-2 py-2 mt-2"
                classList={{ "text-black": darkTheme }}
              >
                <img
                  src={product.img}
                  alt="image pizza"
                  class="object-cover h-48 w-96  rounded-lg shadow-md"
                />

                <div class="relative px-2 -mt-10">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="flex items-baseline">
                      <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                        {product.specialità}
                      </span>
                      <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                        Chef Franco
                      </div>
                    </div>

                    <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                      {product.title}
                    </h4>

                    <div class="mt-1 justify-center  ">
                      <A class="btn" href={"/product/" + product.id}>
                        Dettagli
                      </A>
                    </div>
                    <div class="mt-4">
                      <span class="text-teal-600 text-md font-semibold">
                        4/5 ratings{" "}
                      </span>
                      <span class="text-sm text-gray-600">
                        (based on 300 ratings)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
