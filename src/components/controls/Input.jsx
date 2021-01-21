import React, {  useState} from 'react';
import PropTypes from 'prop-types';



const Input = ({label, size, cbOnChange}) => {
  //use State if it's need
  
  let [inputValue, setInputValue] = useState('');
  
  const handleChange = e =>{
    setInputValue(e.target.value);
    cbOnChange(e.target.value);
  }

  return (
    <>
      {(label) && <label>{label}:</label>}      
      <input className="input__text" size={size} type="text" value={inputValue} onChange={handleChange} />
    </>
  );
};

Input.propTypes = {
  cbOnChange: PropTypes.func,
  initialValue: PropTypes.number,
  label: PropTypes.string,
  size: PropTypes.number,
};

Input.defaultProps = {
  size: 20,

};

export default Input;