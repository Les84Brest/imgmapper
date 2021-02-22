import { Fragment, PureComponent } from 'react';
import { PropTypes } from "prop-types";
import Classes from 'classnames';
import Image from './controls/Image';


//css import
import './AreaDetails.sass';
import Select from './controls/Select';
import { FIGURE_CIRCLE, FIGURE_POLYGON, FIGURE_RECT } from '../constants';
import DetailsInput from './controls/DetailsInput';

class AreaDetails extends PureComponent {

  areaImages = require('../areaImages.json'); // массив иконок полей
  targetOptions = [ // массив значений ссылки для target
    { _blank: 'blank', },
    { _parent: 'parent', },
    { _self: 'self', selected: true, },
    { _top: 'top', },
  ];
  classes = {};
  iconClassess = {};
  areaCoords = []; // контролы для управления координатами фигуры

  constructor(props) {
    super(props);

    this.state = {
      areaToShow: props.areaToShow,
    }

  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.areaToShow !== nextProps.areaToShow) {
      return { ...prevState, areaToShow: nextProps.areaToShow };
    } else {
      return { ...prevState };
    }
  }

  /**Prop Types  */
  static propTypes = {
    updateSvgFigure: PropTypes.func,
    areaToShow: PropTypes.object,
  }

  // готовим информацию к отображению
  prepareArea = () => {

    switch (this.state.areaToShow.figureType) {
      case FIGURE_POLYGON:
        this.figureTypeText = 'polygon';
        this.iconClassess = Classes('area-name__icon', 'poly-icon');
        this.areaCoords = [];
        let pointNum = 1;
        for (let i = 0; i < this.state.areaToShow.points.length; i += 2) { // работаем с парой координат на плоскости
          const x = this.state.areaToShow.points[i];
          const y = this.state.areaToShow.points[i + 1];
          this.areaCoords.push(<DetailsInput
            label={`x${pointNum}`}
            size={4}
            initialValue={x}
            key={'poly' + i}
            cbOnChange={this.cbPolyInputChange}
          />);
          this.areaCoords.push(
            <>
          <DetailsInput
            label={`y${pointNum}`}
            size={4}
            initialValue={y}
            key={'poly' + i + 1}
            cbOnChange={this.cbPolyInputChange}
          /><br/> </>);
          pointNum++;

        }
        break;
      case FIGURE_RECT:
        this.figureTypeText = 'rectangle';
        this.iconClassess = Classes('area-name__icon', 'rect-icon');
        //начальные значения координат для input
        const { x1, x2, y1, y2 } = this.state.areaToShow;
        this.areaCoords = [
          <DetailsInput
            label='x'
            size={4}
            initialValue={x1}
            key='x'
            cbOnChange={this.cbRectInputChange}
          />,
          <DetailsInput
            label='y'
            size={4}
            initialValue={y1}
            key='y1'
            cbOnChange={this.cbRectInputChange}
          />,
          <DetailsInput
            label='width'
            size={4}
            initialValue={x2 - x1}
            key='x2'
            cbOnChange={this.cbRectInputChange}
          />,
          <DetailsInput
            label='heigth'
            size={4}
            initialValue={y2 - y1}
            key='y2'
            cbOnChange={this.cbRectInputChange}
          />,
        ];
        break;
      case FIGURE_CIRCLE:
        this.figureTypeText = 'circle';
        this.iconClassess = Classes('area-name__icon', 'circle-icon');
        let circleRadius = Math.floor(Math.sqrt(Math.pow(this.state.areaToShow.x2 - this.state.areaToShow.x1, 2) + Math.pow(this.state.areaToShow.y2 - this.state.areaToShow.y1, 2)));
        this.areaCoords = [
          <DetailsInput
            label='x'
            size={4}
            initialValue={this.state.areaToShow.x1}
            key='x'
            cbOnChange={this.cbCircleInputChange}
          />,
          <DetailsInput
            label='y'
            size={4}
            initialValue={this.state.areaToShow.y1}
            key='y'
            cbOnChange={this.cbCircleInputChange}
          />,
          <DetailsInput
            label='r'
            size={4}
            initialValue={circleRadius}
            key='r'
            cbOnChange={this.cbCircleInputChange}
          />,
        ];
        break;


      default:
        break;
    }
  }

  //изменение координат прямоугольника
  cbPolyInputChange = (key, value) => {
    let newFigure = { ...this.state.areaToShow };
    let newPoints = [... this.state.areaToShow.points];

    const element = key.split('');
    const pointNum = parseInt(element[1]);
    let index = null;

    if(element[0] == 'x'){
     index = ((pointNum - 1) * 2) ;
    }else{
      index = ((pointNum - 1) * 2) + 1; // это для y координаты
    }

    newPoints.splice(index,1,value);
    newFigure.points = newPoints;

    this.props.updateSvgFigure(newFigure);
  }
  cbRectInputChange = (key, value) => {
    let newFigure = { ...this.state.areaToShow };
    const { x1, x2, y1, y2 } = this.state.areaToShow
    switch (key) {
      case 'x':
        const width = x2 - x1;
        newFigure.x1 = value;
        newFigure.x2 = value + width;

        break;
      case 'y':
        const heigth = y2 - y1;
        newFigure.y1 = value;
        newFigure.y2 = value + heigth;
        break;
      case 'width':

        newFigure.x2 = newFigure.x1 + value;
        break;
      case 'heigth':
        newFigure.y2 = newFigure.y1 + value;
        break;


    }

    this.props.updateSvgFigure(newFigure);
  }

  cbCircleInputChange = (key, value) => {
    let newFigure = { ...this.state.areaToShow };
    //предыдущие координаты точек
    let { x1, y1, x2, y2 } = this.state.areaToShow;

    switch (key) {
      case 'x':
        newFigure.x1 = value;
        // меняем вторую координату по x
        const deltaX = x1 - value;
        newFigure.x2 = x2 - deltaX;
        break;

      case 'y':
        newFigure.y1 = value;
        // меняем вторую координату y
        const deltaY = y1 - value;
        newFigure.y2 = y2 - deltaY;
        break;

      case 'r': //меняем радиус круга
        let oldRadius = Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        let k = value / oldRadius; // коэфициент соотношение между новым и старым радиусом
        newFigure.x2 = Math.floor((x2 - x1) * k + x1);
        newFigure.y2 = Math.floor((y2 - y1) * k + y1);
        break;
    }



    this.props.updateSvgFigure(newFigure);
  }



  // установленный место открытия ссылки
  cbLinkTarget = linkTarget => {
     
     const newArea = Object.assign({}, this.state.areaToShow) ;
     newArea.linkTarget = linkTarget;
     this.props.updateSvgFigure(newArea);
  };

  handleHrefChange = event => {
    let newFigure = { ...this.state.areaToShow };
    newFigure.href = event.target.value;
    this.props.updateSvgFigure(newFigure);
  }
  handleAltChange = event => {
    let newFigure = { ...this.state.areaToShow };
    newFigure.alt = event.target.value;
    this.props.updateSvgFigure(newFigure);
  }


  render() {
    if (this.state.areaToShow) {
      this.prepareArea();

    }

    return (

      <Fragment>
        {this.props.areaToShow && <div className="column__wrap">

          <div className="column__title"> Area details</div>
          <div className="column__content">
            <div className="area-details">
              <div className="area-name">
                <div className="area-name__img">

                  <i className={this.iconClassess}></i>
                </div>
                <div className="area-name__text">
                  <div className="area-name__title"> {this.state.areaToShow.id}</div>
                  <div className="area-name__type">{this.figureTypeText}</div>
                </div>

              </div>
              <div className="area__coords">
                {this.areaCoords}
                
              </div>
              <div className="area__options">

                <div className="input-control">
                  <label>href</label>
                  <input className="input__text text-align-left" type="text" size="40" value={this.state.areaToShow.href} onChange={this.handleHrefChange} />
                </div>
                <div className="input-control">
                  <label>alt</label>
                  <input className="input__text text-align-left" type="text" size="40" value={this.state.areaToShow.alt} onChange={this.handleAltChange} />
                </div>
                <div className="input-control">
                  <label>target</label><Select
                    options={this.targetOptions}
                    cbSelectedItem={this.cbLinkTarget}
                    selectedItem={this.state.areaToShow.linkTarget}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>}
      </Fragment>
    )
  }

}


export default AreaDetails;