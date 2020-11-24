import React, {useState} from 'react';
import PropTypes from 'prop-types';



const FigureControl = ({x, y, cbChangeCoords, visible}) => {

  
  const [coordX, setCoordX] = useState(x);
  const [coordY, setCoordY] = useState(y);

	const handleMouseClick = (event) => {
    event.stopPropagation(); // отменяем всплытие
    let coords = event.target.getBoundingClientRect(); 
    setCoordX(event.clientX );
    setCoordY(event.clientY );
  }

	return (
    {visible} &&
      <circle cx={coordX} cy={coordY}  r={4}  stroke="gray" fill="PaleGreen" strokeWidth=".5" onClick={handleMouseClick} />
    
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