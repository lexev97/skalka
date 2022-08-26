import { useRef, useState } from "react";

import "./_OrderCheckout.scss";

const isEmpty = (value) => value.trim() === "";
const telIncorrect = (value) => value.indexOf("+7") || value.trim().length < 12;

const OrderCheckout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    tel: true,
    city: true,
    street: true,
    bld: true,
    flt: true,
    flr: true,
  });

  const nameInput = useRef();
  const telInput = useRef();
  const cityInput = useRef();
  const streetInput = useRef();
  const bldInput = useRef();
  const fltInput = useRef();
  const ntrncInput = useRef();
  const flrInput = useRef();
  const commentsInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredTel = telInput.current.value;
    const enteredCity = cityInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredBld = bldInput.current.value;
    const enteredFlt = fltInput.current.value;
    const enteredNtrnc = ntrncInput.current.value;
    const enteredFlr = flrInput.current.value;
    const enteredComments = commentsInput.current.value;

    const nameInputIsValid = !isEmpty(enteredName);
    const telInputIsValid = !telIncorrect(enteredTel);
    const cityInputIsValid = !isEmpty(enteredCity);
    const streetInputIsValid = !isEmpty(enteredStreet);
    const bldInputIsValid = !isEmpty(enteredBld);
    const fltInputIsValid = !isEmpty(enteredFlt);
    const flrInputIsValid = !isEmpty(enteredFlr);

    setInputValidity({
      name: nameInputIsValid,
      tel: telInputIsValid,
      city: cityInputIsValid,
      street: streetInputIsValid,
      bld: bldInputIsValid,
      flt: fltInputIsValid,
      flr: flrInputIsValid,
    });

    const formIsValid =
      nameInputIsValid &&
      telInputIsValid &&
      cityInputIsValid &&
      streetInputIsValid &&
      bldInputIsValid &&
      fltInputIsValid &&
      flrInputIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      tel: enteredTel,
      city: enteredCity,
      street: enteredStreet,
      bld: enteredBld,
      flt: enteredFlt,
      ntrnc: enteredNtrnc,
      flr: enteredFlr,
      comments: enteredComments,
    });
  };

  const nameInvClass = inputValidity.name ? "" : "invalid";
  const telInvClass = inputValidity.tel ? "" : "invalid";
  const cityInvClass = inputValidity.city ? "" : "invalid";
  const streetInvClass = inputValidity.street ? "" : "invalid";
  const bldInvClass = inputValidity.bld ? "" : "invalid";
  const fltInvClass = inputValidity.flt ? "" : "invalid";
  const flrInvClass = inputValidity.flr ? "" : "invalid";

  return (
    <form className="order-form" onSubmit={confirmHandler}>
      <div className="order-form__name-bloc">
        <div className={`order-form__field ${nameInvClass}`}>
          <label htmlFor="name">Имя</label>
          <input type="text" id="name" ref={nameInput} />
          {!inputValidity.name && (
            <p className="invalid">Обязательно к заполнению</p>
          )}
        </div>
        <div className={`order-form__field ${telInvClass}`}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            ref={telInput}
            placeholder='Обязательно в формате - "+79017567173"'
          />
          {!inputValidity.tel && (
            <p className="invalid">Проверьте корректность заполнения</p>
          )}
        </div>
      </div>

      <div className="order-form__city-bloc">
        <div className={`order-form__field ${cityInvClass}`}>
          <label htmlFor="city">Город</label>
          <input type="text" id="city" ref={cityInput} />
          {!inputValidity.city && (
            <p className="invalid">Обязательно к заполнению</p>
          )}
        </div>
        <div className={`order-form__field ${streetInvClass}`}>
          <label htmlFor="street">Улица</label>
          <input type="text" id="street" ref={streetInput} />
          {!inputValidity.street && (
            <p className="invalid">Обязательно к заполнению</p>
          )}
        </div>
        <div className={`order-form__field ${bldInvClass}`}>
          <label htmlFor="bld">Номер дома</label>
          <input
            type="text"
            id="bld"
            ref={bldInput}
            placeholder='Например, "д. 1, стр. 1"'
          />
          {!inputValidity.bld && (
            <p className="invalid">Обязательно к заполнению</p>
          )}
        </div>
      </div>

      <div className="order-form__house-bloc">
        <div className={`order-form__field ${fltInvClass}`}>
          <label htmlFor="flt">Квартира / офис</label>
          <input type="text" id="flt" ref={fltInput} />
          {!inputValidity.flt && (
            <p className="invalid">Обязательно к заполнению</p>
          )}
        </div>
        <div className="order-form__field">
          <label htmlFor="ntrnc">Подъезд</label>
          <input type="text" id="ntrnc" ref={ntrncInput} />
        </div>
        <div className={`order-form__field ${flrInvClass}`}>
          <label htmlFor="flr">Этаж</label>
          <input
            type="text"
            id="flr"
            ref={flrInput}
          />
          {!inputValidity.flr && (
            <p className="invalid">Обязательно к заполнению</p>
          )}
        </div>
      </div>

      <div className="order-form__comments-bloc">
        <label htmlFor="comments">Комментарии</label>
        <textarea
          rows="2"
          maxLength="200"
          id="comments"
          ref={commentsInput}
          placeholder='Например, "Без острого перца. За 15 мин до прибытия позвонить."'
        />
      </div>

      <div className="order-form__control-bloc">
        <button
          className="order-cancel-btn"
          type="button"
          onClick={props.onCancel}
        >
          <h2>Отмена</h2>
        </button>
        <button className="order-prcd__btn">
          <h2>Оформить заказ на {props.priceAmount} ₽</h2>
        </button>
      </div>
    </form>
  );
};

export default OrderCheckout;
