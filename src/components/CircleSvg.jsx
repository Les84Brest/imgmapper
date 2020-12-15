import React from 'react';
import PropTypes from 'prop-types';
import FigureControl from './FigureControl';


const CircleSvg = ({ id, x1, y1, x2, y2 }) => {
 

  const getRadius = () => (Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))));

  return (
    <g>
      <circle cx={x1} cy={y1} r={getRadius()} stroke="Fuchsia" fill="DarkViolet" fillOpacity={0.4} strokeWidth="1" id={`circle-${id}`} />

      <FigureControl x={x1} y={y1} key={`${id}-1`} />
      <FigureControl x={x2} y={y2} key={`${id}-2`} />
    </g>

  );

};

CircleSvg.propTypes = {
  x1: PropTypes.number,
  y1: PropTypes.number,
  x2: PropTypes.number,
  y2: PropTypes.number,
  id: PropTypes.string,


}


export default CircleSvg;