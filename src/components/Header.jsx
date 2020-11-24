import React, { useState} from 'react';
import PropTypes from 'prop-types';

import Button from './controls/Button';
import Icon from './controls/Icon';

import './Header.sass';


const Header = ({mapName}) => {
	//use State if it's need
	const [items, setItems] = useState('');
  // feature if need
  const classes = 123;
	

	const handleSomeHandler = () => {
		
  };
  
 

	return (
		<div className='work-img__header'>
		 
          <div className="map-name">{mapName}</div>
          <div className="buttons-wrap">
           <Button href="/settings" className="btn-bordered" onClick={() => {console.log("Settings");}}><Icon name="settings" size={1.5} /> Settings</Button>
            <Button className="btn-solid">
							<Icon name="download" size={1.5} color="#ffe3b5" />
                            Get code
            </Button>
            <Button className="btn-solid" onClick={() => {} } >
						<Icon name="code" size={1.5} color="#ffe3b5" />
              Get map
						</Button>
          </div>
        
		</div>
	);
};

Header.propTypes = {
  mapName: PropTypes.string,  
};

Header.defaultProps = {
  mapName: 'Новая карта',  
};

export default Header;