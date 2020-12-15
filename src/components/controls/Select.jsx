import React, { useState, useEffect, Children, Component } from 'react';
import PropTypes from 'prop-types';
import './Select.sass';

const Select = ({ options, cbSelectedItem }) => {
  // TODO список выезжает вниз. Это пведедение по умолчанию
  // Нужно чтобы он работал от ситуациии, либо вниз Либо вверх
  useEffect(() => {
    optionsData.forEach(item => {
      if (item.selected == true) {
        const key = Object.keys(item);
        setSelectedOption(item[key[0]]);
        cbSelectedItem(key[0]);
      }
    });
  });
  const [optionsData, setOptionsData] = useState(options);
  const [showList, setShowList] = useState(false);
  const [selectedOption, setSelectedOption] = useState();


  const handleOptionClick = (event) => {
    let newOptionsData = optionsData.map(item => {
      if (item.selected === true) {
        item.selected = false;
      }
      let key = Object.keys(item)[0];
      if (key === event.target.dataset.value) {
        item.selected = true;
      }
      return item
    });
    
    setOptionsData(newOptionsData);
   
    handleShowList();
  }

  const handleShowList = () => {
    setShowList(!showList);
  };

  const optionsList = [];

  optionsData.forEach((item, index) => {
    const key = Object.keys(item);

    optionsList.push(
      <li className="select__option" onClick={handleOptionClick} data-value={key[0]} key={index} >{item[key[0]]}</li>)
  });
  

  return (
    <div className="select">
      <div className="select__checked" onClick={handleShowList}>{selectedOption}</div>
      {showList && <ul className="select__dropdown">
        {optionsList}
      </ul>}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  cbSelectedItem: PropTypes.func,
};

Select.defaultProps = {
  options: {},
  cbSelectedItem: () => { },
};

export default Select;