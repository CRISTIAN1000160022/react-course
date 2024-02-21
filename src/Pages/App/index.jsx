import React from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Hooks/Context";
import { Home } from "../Home";
import { MyAccount } from "../MyAccount";
import { MyOrder } from "../MyOrder";
import { MyOrders } from "../MyOrders";
import { NotFound } from "../NotFound";
import { SignIn } from "../SignIn";
import { Navbar } from "../../Components/Navbar";
import { CheckOutSideMenu } from "../../Components/CheckOutSideMenu";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/clothes", element: <Home /> },
    { path: "/jewelery", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/others", element: <Home /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <React.StrictMode>
      <ShoppingCartProvider>
        <ToastContainer />
        <BrowserRouter>
          <AppRoutes />
          <Navbar />
          <CheckOutSideMenu />
        </BrowserRouter>
      </ShoppingCartProvider>
    </React.StrictMode>
  );
};

export default App;
