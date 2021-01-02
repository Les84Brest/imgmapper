import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { FIGURE_CIRCLE, FIGURE_POLYGON, FIGURE_RECT } from '../constants';


//css import
import './AreaListItem.sass';

const AreaListItem = ({ areaInfo,  number, active,  onClick, onDelete}) => {
  
  let classes = ClassNames(
    'area-item', 
    {active }
  ) 

  let iconClass = null ;
  let areaCoords = null;

  switch(areaInfo.figureType){
    case FIGURE_CIRCLE:
      const circleRadius = Math.floor(Math.sqrt(Math.pow(areaInfo.x2 - areaInfo.x1, 2) + Math.pow(areaInfo.y2 - areaInfo.y1, 2)))
      areaCoords = `x1: ${areaInfo.x1}, y1: ${areaInfo.y1}, r: ${circleRadius}`;
      iconClass = ClassNames('list-icon', 'list-circle');
      
      break;      
    case FIGURE_POLYGON:
      areaCoords = `x1: ${areaInfo.points[0]}, y1: ${areaInfo.points[1]}, x2: ${areaInfo.points[2]}, y2: ${areaInfo.points[3]} ...`
      iconClass = ClassNames('list-icon', 'list-poly');
      break;
    case FIGURE_RECT:
      areaCoords = `x1: ${areaInfo.x1}, y1: ${areaInfo.y1}, x2: ${areaInfo.x2}, y2: ${areaInfo.y2}`;
      iconClass = ClassNames('list-icon', 'list-rect');
      break;
  }
  
  
  const getFigureType = (name) => {
    switch(name){
      case FIGURE_CIRCLE:
        return 'Circle';
      case FIGURE_POLYGON:
        return 'Poly';
      case FIGURE_RECT:
        return 'Rect';
    }
    return '';
  }

  const handleItemDelete = (event) => {
    event.stopPropagation();
    onDelete(areaInfo.id);
  }

  return (
    <tr className={classes} onClick={() => {onClick(areaInfo.id)}}>
      <td className="area__number">{number}.</td>
      <td className="area__icon">
        <i className={iconClass}></i>
      </td>
      <td className="area-item__name">{getFigureType(areaInfo.figureType)}</td>
      <td className="area__coords">{areaCoords}</td>
      <td>
        <button className="area-item__delete" onClick={handleItemDelete}>
          <i className="area-item__delete-icon"></i>
        </button>
      </td>
    </tr>
  );
};

AreaListItem.propTypes = {
  areaInfo: PropTypes.object,
  onClick: PropTypes.func,
  number: PropTypes.number,
  onDelete: PropTypes.func, 
  active: PropTypes.bool,
};

AreaListItem.defaultProps = {
  number: 99,
  onClick: () => { },
  onDelete: () => { },
  active: false,
};

export default AreaListItem;