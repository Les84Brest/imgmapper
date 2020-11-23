import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Button from './Button';
import './Modal.sass';


const Modal = (title, isOpen, onCancel, onSubmit, children) => {

  return (
    <>(isOpen) && {
    <Portal>
      <div className="modalOverlay">
        <div className="modalWindow">
          <div className="modalHeader">
            <div className="modalTitle"> {title} </div>
            {/* здесь нужна иконка  на onCancel*/}
          </div>
          <div className="modalBody"> {children} </div>
          <div className="modalFooter">
            <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </Portal>
  }
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
   isOpen: PropTypes.bool,
   onCancel: PropTypes.func,
   onSubmit: PropTypes.func,
   children: PropTypes.node,
};

Modal.defaultProps = {
  title: "modal",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};

export default Modal;