import { Component } from 'react';
import {  MODE_EDIT, } from '../constants';



export const withMove = (svgProps) => SVGCanvas => {

  return (
    class MoveFiguresSvg extends Component {
      constructor(props) {
        super(props);

        this.state = {
          combinedProps: {
            figuresList: svgProps.figuresList,
            workMode: MODE_EDIT,
            cbMouseClick: this.cbMouseClick,
            cbMouseMove: this.cbMouseMove,
            imageSize: svgProps.imageSize,
            figureColors: svgProps.figureColors,
            
          },
          figureId: svgProps.figureId,
          curentFigureId: null, // id  фигуры, с которой идет работа
          firstPoint: null, //первая координата x,y
          startDrawing: false, // рисование не начато
        };

      }

      cbMouseClick = (x, y) => {
      // определяем куда кликнули по фигуре или
        console.log('move ', x, y);

      }

      cbMouseMove = (x, y) => {
        // todo организовать плавное изменение размеров


        
        // console.log('MouseMove x ', x, 'y ', y);


        // // для наглядности что рисуем и где отрисовываем фигуры на mousemove
        // // если флаг startDrawing true - рисование начато никаких фигур еще нет. Добавляем фигуру

        // if (this.state.startDrawing) {
        //   let newFigure = {
        //     figureType: FIGURE_CIRCLE,
        //     x1: this.state.firstPoint.x,
        //     y1: this.state.firstPoint.y,
        //     x2: x,
        //     y2: y,
        //     id: `circle-${this.state.figureId}`,
        //     key: this.state.figureId
        //   }

        //   let newFigures = this.state.combinedProps.figuresList.slice();
        //   newFigures.push(newFigure);

        //   let newCombinedProps = { ...this.state.combinedProps, figuresList: newFigures };
        //   this.setState({
        //     startDrawing: false, // рисование продолжается фигура добавлена
        //     combinedProps: newCombinedProps,
        //   })
        // } else if (this.state.firstPoint !== null) {
        //   let newFigures = this.state.combinedProps.figuresList.slice();
        //   newFigures.pop();
        //   newFigures.push({
        //     figureType: FIGURE_CIRCLE,
        //     x1: this.state.firstPoint.x,
        //     y1: this.state.firstPoint.y,
        //     x2: x,
        //     y2: y,
        //     id: `circle-${this.state.figureId}`,
        //     key: this.state.figureId}
        //   );
        //   let newCombinedProps = { ...this.state.combinedProps, figuresList: newFigures };
        //   this.setState({ combinedProps: newCombinedProps });


        // }

        

      }

      render() {
        return (
          <SVGCanvas {...this.state.combinedProps} />
        );

      }
    }
  )
}

