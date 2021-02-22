import React from 'react';
import DownloadImage from "./DownloadImage";
import Image from './controls/Image';
import SVGCanvasContainer from './SVGCanvasContainer';


//css import
import './MapImage.sass';


const MapImage = ({ setMapImage, setMapName, mapImage, setImageSize, setImageName, }) => {


  const imgStyle = {

    display: 'block'
  }
  let imageWidth, imageHeigth;
  // реф на изображение
  let imgRef = null;



  const setWorkImageRef = ref => {
    imgRef = ref;
    imageWidth = imgRef.clientWidth;
    imageHeigth = imgRef.clientHeight;
    setImageSize({
      imageWidth: imgRef.clientWidth,
      imageHeigth: imgRef.clientHeight,
    });
  }



  return (
    <div className="imgmapper__mapimage">
      {(mapImage) ? <>
        <SVGCanvasContainer />
        <img src={mapImage} style={imgStyle} ref={setWorkImageRef} />
      </>
        :
        <DownloadImage setMapImage={setMapImage} setMapName={setMapName} setImageName={setImageName} />
      }

    </div>
  )
}



export default MapImage;