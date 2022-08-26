import { useState } from "react";

import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

import "./App.scss";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [closingModal, setClosingModal] = useState(false);

  const showCartHandler = () => {
    setClosingModal(true);
    setCartIsShown(true);
    document.body.classList.toggle("lock");
  };
  const closeCartHandler = () => {
    setClosingModal(false);
    setTimeout(() => {
      setCartIsShown(false);
      document.body.classList.toggle("lock");
    }, 300);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart
          slowOpacity={closingModal ? "" : "backdrop_closing"}
          className={closingModal ? "" : "modal_closing"}
          onClose={closeCartHandler}
        />
      )}
      <Header onShowCart={showCartHandler} />
      <Main />
      <Footer />
    </CartProvider>
  );
}

export default App;
