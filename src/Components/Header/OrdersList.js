import "./_OrdersList.scss";

const OrdersList = (props) => {
    return (
      <li>
        <div>
          <div>{props.orderUserName}</div>
          <div>
            Адрес: {props.orderStreet}, дом {props.orderBld}
          </div>
        </div>
        <div style={{ flexShrink: "0"}}>
          <div>Заказ на сумму:</div>
          <div>{props.totalAmount} ₽</div>
        </div>
      </li>
    );
};

export default OrdersList;