import React, {useState} from 'react';
import PropTypes from 'prop-types';



const FigureControl = ({x, y, figureColors, cbChangeCoords, visible}) => {

  
  const [coordX, setCoordX] = useState(x);
  const [coordY, setCoordY] = useState(y);

	const handleMouseClick = (event) => {
   
    event.stopPropagation(); // отменяем всплытие
    // let coords = event.target.getBoundingClientRect(); 
    setCoordX(coordX + 4);
    setCoordY(coordY + 5 );
    
  }
 

	return (
   
      <circle cx={coordX} cy={coordY}  r={4}  stroke={figureColors.markerStrokeColor} fill={figureColors.markerFillColor} strokeWidth=".5"  />
    
	);
};

FigureControl.propTypes = {
  x: PropTypes.number,
  y:PropTypes.number,
  cbChangeCoords: PropTypes.func,
  visible: PropTypes.bool,
  
};

FigureControl.defaultProps = {
  visible: false,
}

export default FigureControl;