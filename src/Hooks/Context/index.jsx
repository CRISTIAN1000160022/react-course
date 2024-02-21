import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
  //Shopping Cart . Increment quantity
  const [count, setCount] = useState(0);

  //Product Detail . Open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //Checkout Side Menu . Open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
  const changeStateCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(!isCheckoutSideMenuOpen);

  //Product Detail . Show product
  const [productToShow, setProductToShow] = useState({});

  //Shopping Cart . Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  //Shopping Cart . Order
  const [order, setOrder] = useState([]);

  //Get products from API
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  //Get products by category
  const [searchByCategory, setSearchByCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  //Get products by title
  const [searchByTitle, setSearchByTitle] = useState("");

  //Filter products by title
  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item?.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  //Filter products by category
  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item?.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  //Set filtered items
  useEffect(() => {
    const filterBy = (serchType, items, searchByTitle, searchByCategory) => {
      if (serchType === "BY_TITLE_AND_CATEGORY") {
        return filteredItemsByCategory(items, searchByCategory).filter((item) =>
          item?.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );
      }
      if (serchType === "BY_TITLE") {
        return filteredItemsByTitle(items, searchByTitle);
      }
      if (serchType === "BY_CATEGORY") {
        return filteredItemsByCategory(items, searchByCategory);
      }
      if (!serchType) {
        return items;
      }
    }

    if (searchByTitle && searchByCategory) {
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    }
    if (searchByTitle && !searchByCategory) {
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    }
    if (searchByCategory && !searchByTitle) {
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    }

    if (!searchByTitle && !searchByCategory) {
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
    }
  }, [items, searchByTitle, searchByCategory]);
  
  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        changeStateCheckoutSideMenu,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ShoppingCartContext, ShoppingCartProvider };
