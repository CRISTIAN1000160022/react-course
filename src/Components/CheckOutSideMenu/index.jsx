import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Hooks/Context";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { OrderCard } from "../../Components/OrderCard";
import { totalPrice } from "../../utils";
import "./styles.css";

const CheckOutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDeleteProduct = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
    localStorage.setItem("cart-products", JSON.stringify(filteredProducts));
  };

  const hadleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.setOrder([...context.order, orderToAdd]);
    localStorage.setItem(
      "order",
      JSON.stringify([...context.order, orderToAdd])
    );
    context.setCartProducts([]);
    localStorage.setItem("cart-products", JSON.stringify([]));
    context.setSearchByTitle(null);
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My order</h2>
        <button onClick={context.closeCheckoutSideMenu}>
          <XCircleIcon className="h-6 w-6 text-black cursor-pointer" />
        </button>
      </div>
      <div className="flex flex-col overflow-y-scroll px-6 flex-1">
        {context.cartProducts?.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total: </span>
          <span className="font-medium text-2xl">
            $ {totalPrice(context.cartProducts)}
          </span>
        </p>
        {totalPrice(context.cartProducts) > 0 && (
          <Link
            to="/my-orders/last"
            //className="w-full bg-black text-white rounded-md py-2"
          >
            <button
              className="w-full bg-black text-white rounded-md py-2 mt-4"
              onClick={() => hadleCheckout()}
            >
              Checkout
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
};

export { CheckOutSideMenu };
