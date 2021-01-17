import  {Component} from 'react';
import Button from './controls/Button';
import Icon from './controls/Icon';
import DetailsInput from "./controls/DetailsInput";

//css import
import './DownloadImage.sass';

class DownloadImage extends Component {
  
  state = {
    imageData: null, // изображение в base64
    dropzoneStyle: null, // значения инлайн стиля для dropszone
  }

  setImage = (image) => {
    this.setState({imageData: image,
      dropzoneStyle: {
        background: `url(${image})  no-repeat left top / cover`, 
      }
    });
  }

//добавить файл через диалог выбора
  handleImageByDialog = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.target.files;
    const image =  files[0];

    const fileReader = new FileReader();

    let imageData = null;

    fileReader.onload = (progressEvent) => {
      imageData = fileReader.result;
      this.setImage(imageData);
    }

    fileReader.readAsDataURL(image);
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
      
      this.setImage(imageData);
      
    }

    fileReader.readAsDataURL(image);
    
  }

  handlerDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }
//onChange={this.handleImageByDialog}
  render() {

    return (
      <div className="loadimage">
        <div className="dropzone" onDrop={this.handleDrop} onDragOver={this.handlerDragover} style={this.state.dropzoneStyle}>
          {(!this.state.imageData) && <div className="dropzone__text" >Drag an image here</div>}
        </div>
        <p className="loadimage__divider-text">or</p>
        <div className="input__wrapper">
          <input type="file" name="file" id="input__file" className="input input__file" onChange={this.handleImageByDialog}/>
          <label for="input__file" className="input__file-button" >
            <span><Icon name="download" size={1.5} color="#5f4496" /></span>
            <span className="input__file-button-text">Select an image</span>
          </label>
        </div>
        {/* URL c которого можно загрузить картинку */}
        <p className="loadimage__divider-text">tape an URL</p>
        <DetailsInput
          label=''
          size={20}
          initialValue=''
          cbOnChange={() => { }}
          key="url"
        />
        <p className="loadimage__divider-text">Map name</p>
        <DetailsInput
          label=''
          size={20}
          initialValue=''
          cbOnChange={() => { }}
          key="map_name"
        />
        <Button className="btn-solid" onClick={() => { }} >
          OK
				</Button>
      </div>
    )
  }
}

export default DownloadImage;