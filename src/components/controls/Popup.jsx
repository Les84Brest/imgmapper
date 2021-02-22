import React from 'react';
import Portal from './Portal';
import PropTypes from 'prop-types';
import './Popup.sass';


const Popup = ({ onClose, popupTitle, children }) => {
  //use State if it's need
  console.log(onClose);


  return (
    <Portal>
      <div className="popup">
        <div className="popup__window">
          <div className="popup__title">{popupTitle}</div>
          <div className="popup__close" onClick={onClose}>X</div>
          
            
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

