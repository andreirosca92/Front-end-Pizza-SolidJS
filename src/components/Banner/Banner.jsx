import banner from "../../assets/banner_pizza.jpg";
const Banner = () => {
  return (
    <div
      class="w-full bg-cover bg-center"
      style={{ height: "32rem", "background-image": `url(${banner})` }}
    ></div>
  );
};

export default Banner;
