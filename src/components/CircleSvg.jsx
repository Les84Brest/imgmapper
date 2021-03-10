import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FigureControl from './FigureControl';
import { MODE_DRAWING } from '../constants';


const CircleSvg = ({ id, x1, y1, x2, y2, figureColors, active, drawing }) => {

  let [fillOpacity, setFillOpacity] = useState(0.4);

  

  const getRadius = () => (Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))));

  return (
    <g>
      <circle cx={x1} cy={y1} r={getRadius()} stroke={figureColors.strokeColor} fill={figureColors.fillColor} fillOpacity={fillOpacity} strokeWidth="1" data-area-id={id} />
      {(drawing) ?
        <FigureControl figureColors={figureColors} x={x1} y={y1} key={`${id}-1`} />
        :
        <>
          <FigureControl figureColors={figureColors} x={x1} y={y1} key={`${id}-1`} id={`${id}-1`} />
          <FigureControl figureColors={figureColors} x={x2} y={y2} key={`${id}-2`} id={`${id}-2`}  />
        </>
      }
    </g>

  );

};

CircleSvg.propTypes = {
  x1: PropTypes.number,
  y1: PropTypes.number,
  x2: PropTypes.number,
  y2: PropTypes.number,
  id: PropTypes.string,
  figureColors: PropTypes.object,

}


export default CircleSvg;