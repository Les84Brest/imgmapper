import React, {useState} from 'react';
import PropTypes from 'prop-types';



const FigureControl = ({x, y, cbChangeCoords, visible}) => {

  
  const [coordX, setCoordX] = useState(x);
  const [coordY, setCoordY] = useState(y);

	const handleMouseClick = (event) => {
    console.log('Mouse Click Control');
    event.stopPropagation(); // отменяем всплытие
    // let coords = event.target.getBoundingClientRect(); 
    setCoordX(coordX + 4);
    setCoordY(coordY + 5 );
    
  }
  const handleMouseUp = event => {
    event.stopPropagation();
    
  }

	return (
   
      <circle cx={coordX} cy={coordY}  r={4}  stroke="gray" fill="PaleGreen" strokeWidth=".5" onClick={handleMouseClick}  />
    
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