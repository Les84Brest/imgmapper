import React, { useState, useEffect, Children, Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';


const AreaListItem = ({ name, number }) => {
  //use State if it's need
  const [items, setItems] = useState('');
  // feature if need
  const classes = 123;


  const handleDeleteArea = () => {
    console.log('удаляем фигуру');
  };

  const iconClass = ClassNames('list-icon', 'list-circle');
  const areaCoords = 'X:15 Y:20 R: 150';

  return (
    <tr className="area-item">
      <td className="area__number">{number}</td>
      <td className="area__icon">
        <i className={iconClass}></i>
      </td>
      <td className="area-item__name">{name}</td>
      <td className="area__coords">{areaCoords}</td>
      <td>
        <button className="area-item__delete" onClick={handleDeleteArea}>
          <i className="area-item__delete-icon"></i>
        </button>
      </td>
    </tr>
  );
};

AreaListItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,

};

AreaListItem.defaultProps = {
  children: 'DefaultButton',
  onClick: () => { },

};

export default AreaListItem;