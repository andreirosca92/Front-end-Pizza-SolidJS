const Card = (props) => {
  return (
    <div
      class="bg-white p-4 text-center"
      classList={{ "rounded-md": props.rounded, "shadow-ms": !props.flat }}
    >
      {props.children}
    </div>
  );
};

export default Card;
