import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import FigureControl from './RectSvg';

const RectSvg = ({ id, x1, y1, x2, y2 }) => {

  //управление размерами прямоугольника

  const [controls, setControls] = useState([]);
 
  // передаем в контролы
  
  const cbChangeControl = (controlX, controlY, controlID) => {
    console.log('Новые координаты', controlX, controlY, controlID);
  }

  setControls([...controls, <FigureControl x={x1} y={y1} cbChangeCoords={cbChangeControl} />])
  setControls([...controls, <FigureControl x={x2} y={y2} cbChangeCoords={cbChangeControl} />])


  return (
    <Fragment>
      {(y2 > y1)} 
    ?
      <rect x={x1} y={y1} height={Math.abs(y2 - y1)} width={Math.abs(x2 - x1)} stroke="black" fill="tomato" strokeWidth="1" id={id} />
    :
      <rect x={x2} y={y2} height={Math.abs(y2 - y1)} width={Math.abs(x2 - x1)} stroke="black" fill="tomato" strokeWidth="1" id={id} />

      <g>
        {controls}
      </g>
    </Fragment>
  );

};

RectSvg.propTypes = {
  id: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

RectSvg.defaultProps = {
  width: 0,
  height: 0,
}
export default RectSvg;