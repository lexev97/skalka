import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CloseBtn from "../UI/CloseBtn/CloseBtn";
import Modal from "../UI/Modal";
import CartMealUnit from "./CartMealUnit";
import OrderCheckout from "./OrderCheckout";

import "./_Cart.scss";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [readyToPrcd, setReadyToPrcd] = useState(false);
  const cartCtx = useContext(CartContext);

  const priceAmount = cartCtx.totalAmount.toLocaleString("ru-RU");
  const areUnitsInCart = cartCtx.totalAmount > 0;

  const readyToPrcdHandler = () => {
    setReadyToPrcd(true);
  };

  const stopToPrcdHandler = () => {
    setReadyToPrcd(false);
  };

  const addToCartHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://skalka-database-default-rtdb.firebaseio.com/orders.json",
    {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }; 

  const submittingContent = (
        <div className="cart-is-empty">
          <h2>Обработка заказа...</h2>
        </div>);

  const submittedContent = (
    <div className="cart-is-empty">
          <h1>Спасибо за заказ!</h1>
          <h2>В ближайшее время с Вами свяжется оператор для подтверждения заказа.</h2>
    </div>
  );

  const cartMealsList = (
    <ul className="cart-list">
      {cartCtx.items.map((item) => (
        <CartMealUnit
          key={item.id}
          img={item.img}
          name={item.name}
          des={item.des}
          ingrds={item.ingrds}
          protein={item.nutrition.protein}
          fat={item.nutrition.fat}
          carbohydrates={item.nutrition.carbohydrates}
          calories={item.nutrition.calories}
          weight={item.weight}
          price={item.price}
          unitQty={item.amount}
          onAdd={addToCartHandler.bind(null, item)}
          onRemove={removeFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal
      slowOpacity={props.slowOpacity}
      className={props.className}
      onClose={props.onClose}
    >
      <header className="cart-header">
        <h1>Корзина</h1>
        <CloseBtn onClose={props.onClose} />
      </header>
      {!didSubmit && !areUnitsInCart && (
        <div className="cart-is-empty">
          <h1>Корзина пуста.</h1>
          <h2>Добавьте что-нибудь из меню.</h2>
        </div>
      )}
      {areUnitsInCart && !isSubmitting && !didSubmit && cartMealsList}
      {areUnitsInCart && !isSubmitting && !didSubmit && (
        <div className="order-prcd">
          {!readyToPrcd && (
            <button className="order-prcd__btn" onClick={readyToPrcdHandler}>
              <h2>Продолжить оформление заказа на {priceAmount} ₽</h2>
            </button>
          )}
          {readyToPrcd && (
            <OrderCheckout
              onCancel={stopToPrcdHandler}
              priceAmount={priceAmount}
              onConfirm={orderSubmitHandler}
            />
          )}
        </div>
      )}
      {isSubmitting && submittingContent}
      {!isSubmitting && didSubmit && submittedContent}
    </Modal>
  );
};

export default Cart;
