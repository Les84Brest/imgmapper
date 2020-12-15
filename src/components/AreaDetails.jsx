import { PureComponent } from 'react';
import { PropTypes } from "prop-types";
import Image from './controls/Image';


//css import
import './AreaDetails.sass';
import Select from './controls/Select';

class AreaDetails extends PureComponent {


  state = {
    areasList: this.props.figuresList,
    currentAreaId: this.props.currentFigureId,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextState = {
      currentAreaId: nextProps.currentFigureId,
      areasList: nextProps.figuresList,
    }
    return nextState;
  }


  /**Prop Types  */
  static propTypes = {
    updateSvgFigure: PropTypes.func,
    figuresList: PropTypes.array,
    currentFigureId: PropTypes.string,
  }
  // установленный место открытия ссылки
  cbLinkTarget = linkTarget => (
    console.log('linkTarget', linkTarget));

  render() {
    if (this.state.currentAreaId) {
      const itemIndex = this.state.areasList.findIndex(item => {
        if (item.id === this.state.currentAreaId) {
          return true;
        }
      });
      const { figureType, id } = this.state.areasList[itemIndex]
    }
    
    return (
      { (this.state.currentAreaId != '') &&
      <div className="column__wrap">

        <div className="column__title"> Area details</div>
        <div className="column__content">
          <div className="area-details">
            <div className="area-name">
              <div className="area-name__img">
                <Image src="images/circle_details.png" />

              </div>
              <div className="area-name__text">
              </div>
                <div className="area-name__title"> {id} </div>
              <div className="area-name__type">{figureType}</div>
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
                <input className="input__text text-align-left" type="text" size="40" />
              </div>
              <div className="input-control">
                <label>alt</label>
                <input className="input__text text-align-left" type="text" size="40" />
              </div>
              <div className="input-control">
                <label>target</label><Select options={[
                  { _blank: 'blank', },
                  { _parent: 'parent', },
                  { _self: 'self', selected: true, },
                  { _top: 'top', },
                ]}
                  cbSelectedItem={this.cbLinkTarget} />

              </div>
            </div>
          </div>
        </div>
      </div>
    }
    )
    }
  }
}

export default AreaDetails;