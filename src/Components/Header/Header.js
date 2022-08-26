import React, {
  // Fragment,
  useContext,
  // useEffect,
  // useState,
} from "react";
// import ReactDOM from "react-dom";
import CartIcon from "./CartIcon";
import UserArea from "./UserArea";
import LogoMini from "./LogoMini";
import CartContext from "../../store/cart-context";

import "./_Header.scss";

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  // const [isMobile, setIsMobile] = useState(null);

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     if (document.documentElement.clientWidth < 769 && !isMobile) {
  //       setIsMobile(true);
  //       window.removeEventListener("resize", resizeHandler);
  //     } else if (document.documentElement.clientWidth > 769 && isMobile) {
  //       setIsMobile(false);
  //       window.removeEventListener("resize", resizeHandler);
  //     }
  //   };
  //   window.addEventListener("resize", resizeHandler);
  // }, [isMobile]);

  return (
    <header className="main-header">
      <div className="main-header-wrapper">
        <UserArea />
        <div className="logo-area">
          <div className="logo-area__city">
            <p>Санкт-Петербург</p>
          </div>
          <div className="logo-area__logo">
            <LogoMini />
          </div>
          <div className="logo-area__tel">
            <p>+7 (999) 777-77-**</p>
          </div>
        </div>
        <div className="cart-wrapper">
          <button className="cart-btn" onClick={props.onShowCart}>
            <span className="cart-btn__icon">
              <CartIcon />
            </span>
            <span className="cart-btn__num">
              <h2>
                {cartCtx.totalAmount.toLocaleString("ru-RU")} <span>₽</span>
              </h2>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
