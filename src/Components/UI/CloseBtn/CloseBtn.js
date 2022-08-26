import CloseIcon from "./CloseIcon";

import './_CloseBtn.scss';

const CloseBtn = (props) => {
    return (
      <button className="close-btn" onClick={props.onClose}>
        <CloseIcon />
      </button>
    );
};

export default CloseBtn;