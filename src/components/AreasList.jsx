import { Component, Fragment } from 'react';
import AreaListItem from './AreaListItem';
import PropTypes from 'prop-types';


//css import
import './AreasList.sass';


class AreasList extends Component {


  /**Prop Types  */
  static propTypes = {
    figuresList: PropTypes.array,
    deleteSvgFigure: PropTypes.func,  // actionmaker for delete figure/area from list
    setCurrentFigureId: PropTypes.func,
    currentFigureId: PropTypes.string,
  }

  state = {
    figuresList: this.props.figuresList,
    currentFigureId: this.props.currentFigureId,
  }

  cbClickArea = (id) => {

    this.setState({
      currentFigureId: id,
    });

    this.props.setCurrentFigureId(id);

  }
  //удаляем область
  cbDeleteArea = (id) => {
    // один элемент удаляем его и массив фигур получается пустой
    if (this.state.figuresList.length == 1) {
      this.props.deleteSvgFigure(id);
      // сбрасываем текущую фигуру
      this.props.setCurrentFigureId(null);
      return;
    }

    // найдем id элемента, который нужно сделать текущим
    // в общем случае это предыдущий элемент

    let nextFocusElement = null;
    for (let i = 0; i < this.state.figuresList.length; i++) {
      const element = this.state.figuresList[i];

      if (element.id === id) { // элемент для удаления найден. Анализируем его окружение
        if(this.state.currentFigureId !== id){
          console.log('curent id ', this.state.currentFigureId);
          nextFocusElement = this.state.currentFigureId;
          break;
        }else{
          if (i == 0) {// первый элемент
            nextFocusElement = this.state.figuresList[i + 1].id;
            break;
          }
  
          nextFocusElement = this.state.figuresList[i - 1].id;
          break;
  
        }
        
      }



    }
    this.props.deleteSvgFigure(id);
    // устанавливаем текущую фигуру для детального отображения
    this.props.setCurrentFigureId(nextFocusElement);


  }

  static getDerivedStateFromProps(nextProps, prevState) {

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
        onDelete={this.cbDeleteArea}
        onClick={this.cbClickArea}
        key={item.key}
        active={this.state.currentFigureId === item.id ? true : false}
      />);
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


