import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';



const DetailsInput = ({label, size, initialValue, cbOnChange}) => {
  //use State if it's need
  
  let inputRef = null;
 
  
  useEffect(() => { // при переданном новом начальном значении меняем значение input
    
    inputRef.value = initialValue;
  }, [initialValue]);

  const handleOnBlur = (e) => {
    
    cbOnChange(label, parseInt(inputRef.value));
  };

 const setInputRef = ref => {
  inputRef = ref;
 }
  return (
    <>
      {(label) && <label>{label}:</label>}      
      <input className="input__text" size={size} type="text" defaultValue={initialValue}  ref={setInputRef} onBlur={handleOnBlur}/>
    </>
  );
};

DetailsInput.propTypes = {
  cbOnChange: PropTypes.func,
  initialValue: PropTypes.number,
  label: PropTypes.string,
  size: PropTypes.number,
};

DetailsInput.defaultProps = {
  size: 20,

};

export default DetailsInput;