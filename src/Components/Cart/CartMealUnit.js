import { Fragment, useState } from "react";
import PlusMinusButton from "../UI/PlusMinusButton";
import UnitInfo from "../ItemInfo/UnitInfo";

import "./_CartMealUnit.scss";

const CartMealUnit = (props) => {
  const [cartUnitInfoIsShown, setCartUnitInfoIsShown] = useState(false);
  const [closingInfo, setClosingInfo] = useState(false);

  const openUnitInfoHandler = () => {
    setClosingInfo(true);
    setCartUnitInfoIsShown(true);
  };
  const closeUnitInfoHandler = () => {
    setClosingInfo(false);
    setTimeout(() => {
      setCartUnitInfoIsShown(false);
    }, 300);
  };

  const unitPriceAmount = (props.price * props.unitQty).toLocaleString("ru-RU");
  const unitWeightAmount = (props.weight * props.unitQty).toLocaleString(
    "ru-RU"
  );

  const cartUnitInfo = (
    <UnitInfo
      id={props.id}
      img={props.img}
      alt={props.name}
      name={props.name}
      des={props.des}
      ingrds={props.ingrds}
      weight={props.weight}
      protein={props.protein}
      fat={props.fat}
      carbohydrates={props.carbohydrates}
      calories={props.calories}
      price={props.price}
      unitInCart={props.unitQty}
      onAdd={props.onAdd}
      onRemove={props.onRemove}
      unitQty={props.unitQty}
      onClose={closeUnitInfoHandler}
      slowOpacity={closingInfo ? "" : "backdrop_closing"}
      className={closingInfo ? "" : "modal_closing"}
    />
  );

  return (
    <Fragment>
      {cartUnitInfoIsShown && cartUnitInfo}
      <li>
        <div className="cart-meal-item">
          <div className="cart-meal-item__img">
            <img
              src={props.img}
              alt={props.name}
              onClick={openUnitInfoHandler}
            />
          </div>
          <div className="cart-meal-item__txt">
            <h2>{props.name}</h2>
            <p>Вес: {unitWeightAmount} гр.</p>
          </div>
        </div>
        <div className="cart-item-amount">
          <div>
            <h2>{unitPriceAmount} ₽</h2>
          </div>
          <div>
            <PlusMinusButton
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              minusTxt={<h2>-</h2>}
              unitQty={<h2>{props.unitQty}</h2>}
              plusTxt={<h2>+</h2>}
            />
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default CartMealUnit;
