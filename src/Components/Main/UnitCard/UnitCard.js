import { Fragment, useState, useContext } from "react";
import UnitInfo from "../../ItemInfo/UnitInfo";
import CartContext from "../../../store/cart-context";
import AddButton from "../../UI/AddButton";
import PlusMinusButton from "../../UI/PlusMinusButton";

import "./_UnitCard.scss";

const UnitCard = (props) => {
  const [unitInfoIsShown, setUnitInfoIsShown] = useState(false);
  const [closingInfo, setClosingInfo] = useState(false);
  const cartCtx = useContext(CartContext);

  const itemIndex = cartCtx.items.findIndex((item) => item.id === props.id);
  const unitInCart = itemIndex >= 0;
  let unitQty = null;

  if (unitInCart) {
    unitQty = cartCtx.items[itemIndex].amount;
  }

  const showUnitInfoHandler = () => {
    setClosingInfo(true);
    setUnitInfoIsShown(true);
    document.body.classList.toggle("lock");
  };
  const closeUnitInfoHandler = () => {
    setClosingInfo(false);
    setTimeout(() => {
      setUnitInfoIsShown(false);
      document.body.classList.toggle("lock");
    }, 300);
  };

  const addToCartHandler = () => {
    cartCtx.addItem({
      ...props.unit,
      amount: 1,
    });
  };

  const removeFromCartHandler = () => {
    cartCtx.removeItem(props.id);
  };

  const modalUnitInfo = (
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
      onClose={closeUnitInfoHandler}
      onAdd={addToCartHandler}
      onRemove={removeFromCartHandler}
      unitInCart={unitInCart}
      unitQty={unitQty}
      slowOpacity={closingInfo ? "" : "backdrop_closing"}
      className={closingInfo ? "" : "modal_closing"}
    />
  );

  return (
    <Fragment>
      {unitInfoIsShown && modalUnitInfo}
      <li className="meals-card">
        <div className="meals-card__img">
          <img src={props.img} alt={props.name} onClick={showUnitInfoHandler} />
        </div>
        <div className="meals-card__name">
          <h2>{props.name}</h2>
        </div>
        <div className="meals-card__des">
          <p>{props.ingrds}</p>
        </div>
        <div className="meals-card__add">
          <h3>{props.price.toLocaleString("ru-RU")} ₽</h3>
          {!unitInCart && (
            <AddButton onAdd={addToCartHandler}>
              <h3>В Корзину</h3>
            </AddButton>
          )}
          {unitInCart && (
            <PlusMinusButton
              onAdd={addToCartHandler}
              onRemove={removeFromCartHandler}
              minusTxt={<h3>-</h3>}
              unitQty={<h3>{unitQty}</h3>}
              plusTxt={<h3>+</h3>}
            />
          )}
        </div>
      </li>
    </Fragment>
  );
};

export default UnitCard;
