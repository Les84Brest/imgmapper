import {PureComponent, Component} from 'react';
import AreaListItem from './AreaListItem';
import PropTypes from 'prop-types';


//css import
import './AreasList.sass';

class AreasList extends Component {


  /**Prop Types  */
  static propTypes = {
    figuresList: PropTypes.array,
    deleteSvgFigure: PropTypes.func,  // actionmaker for delete figure/area from list
  }

  state = {
    figuresList: this.props.figuresList,
  }

    static getDerivedStateFromProps(nextProps, prevState){
      console.log('getDerivedStateFromProps - nextProps', nextProps);
      if (nextProps.figuresList.length !== prevState.figuresList.length) {
        return {figuresList: nextProps.figuresList}
      }
      return {};
    }

  render() {
    let areas =[];
    
      this.state.figuresList.forEach((item, i) => {
        areas.push(<AreaListItem
          name={item.figureType}
          id={item.id}
          number={i + 1}
          key={item.key} />);
      });
    
    return (
      <div className="column__wrap">
        <div className="column__title"> Areas</div>
        <table className="areas__list">
          <tbody>

            {areas}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AreasList;