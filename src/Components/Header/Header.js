import React from "react";
import LogoMini from "./LogoMini";

import "./_Header.scss"

const Header = (props) => {
  return (
    <header className="main-header">
      <div className="main-header-wrapper">
        <div className="user">
          <div className="user__login">
            <h2>Вход</h2>
          </div>
          <span></span>
          <div className="user__reg">
            <h2>Регистрация</h2>
          </div>
        </div>
        <div className="logo-area">
          <div className="logo-area__city">
            <p>Санкт-Петербург</p>
          </div>
          <div className="logo-area__logo">
            <LogoMini />
          </div>
          <div className="logo-area__tel">
            <p>+7 (199) 777-77-77</p>
          </div>
        </div>
        <div className="cart">
          <h2>Корзина</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
