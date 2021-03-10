import { Component } from 'react';
import Icon from './controls/Icon';
import Input from "./controls/Input";
import PropTypes from 'prop-types';
//https://content2.onliner.by/catalog/device/main/b2b7550056f1f3e953212c79ce65028e.jpeg
//css import
import './DownloadImage.sass';

class DownloadImage extends Component {

  state = {
    imageData: null, // изображение в base64
    dropzoneStyle: null, // значения инлайн стиля для dropszone
    imageSize: null, // размеры изображения
    mapName: null,
    imageName: null,
  }

  setImage = (image, imageName) => {
    let img = new Image();
    let imgSize = { width: null, height: null, };

    img.onload = function () {
      imgSize.width = this.width;
      imgSize.height = this.height;
    }

    this.setState({
      imageData: image,
      imageName: imageName,
      dropzoneStyle: {
        background: `url(${image})  no-repeat left top / cover`,
      },
      imageSize: imgSize,
    });
  }

  /**Prop Types  */
  static propTypes = {
    setMapImage: PropTypes.func,
    setImageSize: PropTypes.func,

  }
  
  //добавить файл через диалог выбора
  handleImageByDialog = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.target.files;
    const image = files[0];

    const fileReader = new FileReader();

    let imageData = null;

    fileReader.onload = (progressEvent) => {
      imageData = fileReader.result;
      this.setImage(imageData, image.name);
    }

    fileReader.readAsDataURL(image);
  }
  //проверяем тип файла
  testFile(type) {
    switch (type) {
      case 'image/jpeg':
      case 'image/gif':
      case 'image/png':
        return true;
    }
    return false;
  }
  // устанавливаем имя карты

  cbSetMapName = mapName => {
    this.setState({ mapName: mapName });
  }

  cbImageFromURL = imageURL => { 
    let regExp = /([A-Za-z0-9-#^_&*()]+\.[gifpnje]{3,4})$/gi;  
    let imageName = imageURL.match(regExp);
    
    this.setImage(imageURL, imageName);
  }
  // добавить файл через drag-n-drop


  handleDrop = (e) => {

    e.stopPropagation();
    e.preventDefault();

    let files = e.dataTransfer.files;
    if (files.length != 1) {
      return;
    }

    let image = files[0];
    let imageData = null;
  
    let fileReader = new FileReader();
    fileReader.onload = progressEvent => {
      imageData = fileReader.result;

      this.setImage(imageData, image.name);
    }

    fileReader.readAsDataURL(image);

  }
  // сохраняем изображение для работы
  handlerSaveImageData = (e) => {
    
    if (this.state.imageData) {
      this.props.setMapImage(this.state.imageData);
      let toSave = this.state.mapName.replace(/\s+/g, '_');
      this.props.setMapName(toSave);
      this.props.setImageName(this.state.imageName);
      
    }
  
    
    
  }

  handlerDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }
  
  render() {

    return (
      <div className="loadimage">
        <div className="dropzone" onDrop={this.handleDrop} onDragOver={this.handlerDragover} style={this.state.dropzoneStyle}>
          {(!this.state.imageData) && <div className="dropzone__text" >Drag image here</div>}
        </div>
        <p className="loadimage__divider-text">or</p>
        <div className="input__wrapper">
          <input type="file" name="file" id="input__file" className="input input__file" onChange={this.handleImageByDialog} />
          <label htmlFor="input__file" className="input__file-button" >
            <span><Icon name="download" size={1.5} color="#5f4496" /></span>
            <span className="input__file-button-text">Select image</span>
          </label>
        </div>
        {/* URL c которого можно загрузить картинку */}
        <p className="loadimage__divider-text"> image URL</p>
        <Input
          label=''
          size={20}
          cbOnChange={this.cbImageFromURL}
          key="url"
        />
        <p className="loadimage__divider-text">Map name</p>
        <Input
          label=''
          size={20}

          cbOnChange={this.cbSetMapName}
          key="map_name"
        />
        <button className="btn-solid" onClick={this.handlerSaveImageData} >
          OK
				</button>
      </div>
    )
  }
}

export default DownloadImage;