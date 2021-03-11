import React, {useEffect, useRef} from 'react';
import Portal from './Portal';
import PropTypes from 'prop-types';
import './Popup.sass';


const Popup = ({ onClose, popupTitle, children }) => {
    
  const popupRef = useRef(null);

  useEffect(() => {
    popupRef.current.classList.toggle('popup__show');
   
  });

  const closeHandle = (e) => {
    popupRef.current.classList.toggle('popup__show');
    onClose();
  }
  return (
    <Portal>
      <div className="popup">
        <div className="popup__window" ref={popupRef}>
          <div className="popup__title">{popupTitle}</div>
          <div className="popup__close" onClick={closeHandle}>X</div>    
            <div className="popup__content">
              {children}
            </div>
          
        </div>
      </div>
    </Portal>

  );
};

Popup.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,

};

Popup.defaultProps = {

  onClose: () => { },

};

export default Popup;

