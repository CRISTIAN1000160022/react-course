import { useContext } from "react";
import { ShoppingCartContext } from "../../Hooks/Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

const Card = (item) => {
  //Definimos una constante que va a ser igual al contexto de nuestro carrito de compras
  const context = useContext(ShoppingCartContext);

  const showProductDetail = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    localStorage.setItem(
      "cart-products",
      JSON.stringify([...context.cartProducts, productData])
    );
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  const renderIcon = (id) => {
    const isInCart =
      context.cartProducts?.filter((product) => product.id === id).length > 0;
    if (isInCart) {
      return (
        <button
          className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1"
        >
          <CheckIcon className="h-6 w-6 text-white" />
        </button>
      );
    } else {
      return (
        <button
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductToCart(event, item.item)}
        >
          <PlusIcon className="h-6 w-6 text-black" />
        </button>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProductDetail(item.item)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {item.item.category.toUpperCase()}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={item.item.image}
          alt={item.item.description}
        />
        {renderIcon(item.item.id)}
        <p className="flex justify-between items-center">
          <span className="text-xs font-light mr-2 line-clamp-2 ">
            {item.item.title}
          </span>
          <span className="text-lg font-medium">{"$" + item.item.price}</span>
        </p>
      </figure>
    </div>
  );
};

export { Card };
