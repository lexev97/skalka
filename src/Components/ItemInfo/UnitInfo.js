import CloseBtn from "../UI/CloseBtn/CloseBtn";
import AddButton from "../UI/AddButton";
import PlusMinusButton from "../UI/PlusMinusButton";
import Modal from "../UI/Modal";

import "./_UnitInfo.scss";

const UnitInfo = (props) => {
  return (
    <Modal
      slowOpacity={props.slowOpacity}
      className={props.className}
      onClose={props.onClose}
    >
      <header className="unit-info-header">
        <h1>{props.name}</h1>
        <CloseBtn onClose={props.onClose} />
      </header>
      <div className="unit-info">
        <div className="unit-info__img">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="unit-info__txt">
          <div className="unit-info__des">
            <h2>Описание:</h2>
            <p>{props.des}</p>
          </div>
          <div className="unit-info__сomposition">
            <h2>Состав:</h2>
            <p>{props.ingrds}</p>
          </div>
          <div className="unit-info__nutrition">
            <h2>Характеристики:</h2>
            <ul>
              <li>Вес: {props.weight} г.</li>
              <li>Белки: {props.protein} г.</li>
              <li>Жиры: {props.fat} г.</li>
              <li>Углеводы: {props.carbohydrates} г.</li>
              <li>Калорийность: {props.calories} ккал. / 100 г.</li>
            </ul>
          </div>
          <div className="unit-info__add">
            <h2>{props.price} ₽</h2>
            {!props.unitInCart && (
              <AddButton onAdd={props.onAdd}>
                <h2>В Корзину</h2>
              </AddButton>
            )}
            {props.unitInCart && (
              <PlusMinusButton
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                minusTxt={<h2>-</h2>}
                unitQty={<h2>{props.unitQty}</h2>}
                plusTxt={<h2>+</h2>}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UnitInfo;
