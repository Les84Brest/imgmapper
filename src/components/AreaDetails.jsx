import React from 'react';

import Image from './controls/Image';


//css import
import './AreaDetails.sass';

class AreaDetails extends React.PureComponent {


  state = {

  }

  /**Prop Types  */
  static propTypes = {


  }

  someHandler = () => {

  }


  render() {

    return (
      <div className="column__wrap">
        <div className="column__title"> Area details</div>
        <div className="column__content">
          <div className="area-details">
            <div className="area-name">
              <div className="area-name__img">
                <Image src="images/circle_details.png" />

              </div>
              <div className="area-name__text">
                <div className="area-name__title">Circle 1</div>
                <div className="area-name__type">circle</div>
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
                <input className="input__text text-align-left" type="text" size="40" />
              </div>
              <div className="input-control">
                <label>alt</label>
                <input className="input__text text-align-left" type="text" size="40" />
              </div>
              <div className="input-control">
              <label>target</label>
              <select>
                  <option value="_self">self</option>
                  <option value="_new">new</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AreaDetails;