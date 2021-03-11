import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from "./controls/Popup";

import Button from './controls/Button';
import Icon from './controls/Icon';

import './Header.sass';
import { FIGURE_RECT, FIGURE_CIRCLE, FIGURE_POLYGON } from '../constants';


const Header = ({ mapName, figuresList, imageName, }) => {

  //отображение модального окна с кодом картинки
  let [showModal, setShowModal] = useState(false);
  let [mapCode, setMapCode] = useState([]);

  // получаем атрибуты поля
  const getAreaAtributes = item => {
    let attributes = '';
    if(item.href !== ''){
      attributes += 'href="' + item.href +'" ';
    }

    if(item.alt !== ''){
      attributes += 'alt="' + item.alt +'" ';
    }

    if(item.linkTarget !== ''){
      attributes += 'target="' + item.linkTarget +'" ';
    }

    return attributes;
  }

  const getMap = () => {
    
    let mapCode = []
    mapCode.push(`<img src="${imageName}" alt="" usemap="#${mapName}" />`);
    mapCode.push(<br />);
    mapCode.push(`<map name="${mapName}"> `);
    mapCode.push(<br />);
    figuresList.forEach(item => {
      // получаем параметры фигуры: ссылку, target
      const areaAtributes = getAreaAtributes(item);

      switch (item.figureType) {
        case FIGURE_POLYGON:
          const rectCoords = item.points.join(', ');
          mapCode.push(`<area shape="poly" 
           coords="${rectCoords}" ${areaAtributes}>`);
          mapCode.push(<br />);
          break;

        case FIGURE_CIRCLE:
          const { x1, x2, y1, y2 } = item;
          const radius = Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
          const circleCoords = `${x1}, ${y1}, ${radius}`;
          mapCode.push(`<area shape="circle" 
          coords="${circleCoords}" ${areaAtributes}>`);
          mapCode.push(<br />);
          break;

        case FIGURE_RECT:
          mapCode.push(`<area shape="rect" coords="${item.x1}, ${item.y1}, ${item.x2}, ${item.y2}" ${areaAtributes}>`);
          mapCode.push(<br />);
          break;
      }
    })

    mapCode.push(<br />);
    mapCode.push('</map>');
    setMapCode(mapCode);
    setShowModal(true);
  }

  const cbPopupClose = () => {
    
    setShowModal(false);
  }


  /**форматирование тегов */


  return (
    <div className='work-img__header'>
      {(showModal) && <Popup onClose={cbPopupClose} popupTitle="Image map code" >
        {mapCode}
        <br/>
        <Button className="btn-solid" onClick={() =>{
          const clipboardText = mapCode.reduce((prev, item) => {
            console.log('prev - ', prev, ' cur - ', item);
            if(typeof item == 'string'){
              return  prev + item + '\n';
            }
            return prev;
          }, '');
          navigator.clipboard.writeText(clipboardText)
          .then(() => {
            
          })
          .catch(err => {
            console.log('Couldn\'t copy code to clipboard', err);
          });
        }}>
          Copy code
            </Button>
      </Popup>
      }

      <div className="map-name">{mapName}</div>
      <div className="buttons-wrap">
        {/* todo кнопка настроек приложения */}
        {/*<Button href="/settings" className="btn-bordered" onClick={() => { console.log("Settings"); }}><Icon name="settings" size={1.5} /> Settings</Button>*/}
        <Button className="btn-solid" onClick={getMap}>
          <Icon name="download" size={1.5} color="#ffe3b5" />
                Get code
            </Button>
        {/* <Button className="btn-solid" onClick={() => { }} >
          <Icon name="code" size={1.5} color="#ffe3b5" />
              Get map
				</Button> */}
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