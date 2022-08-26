import './_AddButton.scss';

const AddButton = (props) => {
    return (
      <button className="add-first" onClick={props.onAdd}>
        {props.children}
      </button>
    );
};

export default AddButton;