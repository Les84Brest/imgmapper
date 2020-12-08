import React from 'react';
import AreaListItem from './AreaListItem';



//css import
import './AreasList.sass';

class AreasList extends React.PureComponent {

  

  state = {

  }

  /**Prop Types  */
  static propTypes = {


  }

  

  render() {

    return (
      <div className="column__wrap">
        <div className="column__title"> Areas</div>
        <table className="areas__list">
          <tbody>

            <tr className="area-item">
              <td className="area__number">1.</td>
              <td className="area__icon">
                <i className="list-icon list-circle"></i>
              </td>
              <td className="area-item__name">Circle</td>
              <td className="area__coords">X:15 Y:20 R: 150</td>
              <td>
                <button className="area-item__delete">
                  <i className="area-item__delete-icon"></i>
                </button>
              </td>
            </tr>

            <tr className="area-item">
              <td className="area__number">2.</td>
              <td className="area__icon">
                <i className="list-icon list-circle"></i>
              </td>
              <td className="area-item__name">Circle</td>
              <td className="area__coords">X:15 Y:20 R: 150</td>
              <td>
                <button className="area-item__delete">
                  <i className="area-item__delete-icon"></i>
                </button>
              </td>
            </tr>

          <AreaListItem name="otherName" number={333} key="1"/>
          </tbody>
        </table>
      </div>
    )
  }
}

export default AreasList;