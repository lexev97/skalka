import './_PlusMinusButton.scss';

const PlusMinusButton = (props) => {
    return (
      <div className="add-more">
        <button onClick={props.onRemove}>{props.minusTxt}</button>
        <span>{props.unitQty}</span>
        <button onClick={props.onAdd}>{props.plusTxt}</button>
      </div>
    );
};

export default PlusMinusButton;