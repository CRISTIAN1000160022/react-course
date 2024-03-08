import React, { useContext } from "react";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import {
  ShoppingCartContext,
  ShoppingCartProvider,
  initializeLocalStorage,
} from "../../Hooks/Context";
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
  const context = useContext(ShoppingCartContext);
  //Account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);
  //Sign out
  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  //Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  //Is signed out
  const isUserSignedOut = context.signOut || parsedSignOut;

  let routes = useRoutes([
    {
      path: "/",
      element:
        hasUserAnAccount && !isUserSignedOut ? (
          <Home />
        ) : (
          <Navigate replace to="/sign-in" />
        ),
    },
    {
      path: "/clothes",
      element:
        hasUserAnAccount && !isUserSignedOut ? (
          <Home />
        ) : (
          <Navigate replace to="/sign-in" />
        ),
    },
    {
      path: "/jewelery",
      element:
        hasUserAnAccount && !isUserSignedOut ? (
          <Home />
        ) : (
          <Navigate replace to="/sign-in" />
        ),
    },
    {
      path: "/electronics",
      element:
        hasUserAnAccount && !isUserSignedOut ? (
          <Home />
        ) : (
          <Navigate replace to="/sign-in" />
        ),
    },
    {
      path: "/others",
      element:
        hasUserAnAccount && !isUserSignedOut ? (
          <Home />
        ) : (
          <Navigate replace to="/sign-in" />
        ),
    },
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
  initializeLocalStorage();

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
