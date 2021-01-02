import { Fragment, PureComponent } from 'react';
import { PropTypes } from "prop-types";
import Classes from 'classnames';
import Image from './controls/Image';


//css import
import './AreaDetails.sass';
import Select from './controls/Select';
import { FIGURE_CIRCLE, FIGURE_POLYGON, FIGURE_RECT } from '../constants';

class AreaDetails extends PureComponent {

  areaImages = require('../areaImages.json'); // массив иконок полей
  targetOptions = [ // массив значений ссылки для target
    { _blank: 'blank', },
    { _parent: 'parent', },
    { _self: 'self', selected: true, },
    { _top: 'top', },
  ];
  classes = {}
  iconClassess= {}

  constructor(props) {
    super(props);

    this.state = {
      areaToShow: props.areaToShow,

    }

  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.areaToShow !== nextProps.areaToShow) {
      return { ...prevState, areaToShow: nextProps.areaToShow };
    }else{
      return {...prevState};
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
        
        break;
        case FIGURE_RECT:
          this.figureTypeText = 'rectangle';
          this.iconClassess = Classes('area-name__icon', 'rect-icon');
          break;
          case FIGURE_CIRCLE:
            this.figureTypeText = 'circle';
            this.iconClassess = Classes('area-name__icon', 'circle-icon');
        break;


      default:
        break;
    }

    
    this.figureTypeImage = this.areaImages[this.state.areaToShow.figureType];
    
  }

  // установленный место открытия ссылки
  cbLinkTarget = linkTarget => {
    // const newArea = Object.assign({}, this.state.areaToShow) ;
    // newArea.linkTarget = linkTarget;
    // this.props.updateSvgFigure(newArea);
  };
  handleHrefChange = event => {
      let newFigure= {...this.state.areaToShow};
      newFigure.href = event.target.value;
      let newState= {...this.state, areaToShow: newFigure}
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
                <label>X:</label>
                <input className="input__text" size={4} type="text" />
                <label>Y:</label>
                <input className="input__text" size={4} type="text" />
                <label>Radius:</label>
                <input className="input__text" size={4} type="text" />
              </div>
              <div className="area__options">

                <div className="input-control">
                  <label>href</label>
                  <input className="input__text text-align-left" type="text" size="40" value={this.state.areaToShow.href} onChange={this.handleHrefChange} />
                </div>
                <div className="input-control">
                  <label>alt</label>
                  <input className="input__text text-align-left" type="text" size="40" />
                </div>
                <div className="input-control">
                  <label>target</label><Select options={this.targetOptions}
                    cbSelectedItem={this.cbLinkTarget} />

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