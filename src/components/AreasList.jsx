import { PureComponent, Component, Fragment } from 'react';
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

  //удаляем область
  cbDeleteArea = (id )=> {
    // найдем id предыдущего члена массива для того чтобы сделать его текущим
    if (this.state.figuresList.length > 1){
      let prevElementIndex = null;
      for (let i = 0; i < this.state.figuresList.length; i++) {
        const element = this.state.figuresList[i];
        if (element.id === id && i !== 0){
          prevElementIndex = this.state.figuresList[i-1].id;
          break;
        }else{
          // назначаем для детализации следующий элемент
          prevElementIndex = this.state.figuresList[i+1].id;
          break;
        }
        
      }
      this.props.deleteSvgFigure(id);
      // устанавливаем текущую фигуру для детального отображения
      this.props.setCurrentFigureId(prevElementIndex);
    }else{
      this.props.deleteSvgFigure(id);
      // сбрасываем текущую фигуру
      this.props.setCurrentFigureId(null);
    }

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps - nextProps', nextProps);
    if (nextProps.figuresList.length !== prevState.figuresList.length) {
      return { figuresList: nextProps.figuresList }
    }
    return {};
  }

  
  render() {
    let areas = [];

    this.state.figuresList.forEach((item, i) => {
      areas.push(<AreaListItem
        areaInfo={item}
        number={i + 1}
        onClick={this.cbDeleteArea}
        key={item.key} />);
    });

    return (
      <Fragment>
        {areas.length > 0 &&
          <div className="column__wrap">
            <div className="column__title"> Areas</div>
            <table className="areas__list">
              <tbody>
                {areas}
              </tbody>
            </table>
          </div>
        }
      </Fragment>
    )
  }
}

export default AreasList;