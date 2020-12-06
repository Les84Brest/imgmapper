import { Component } from 'react';
import { FIGURE_CIRCLE, MODE_DRAWING } from '../constants';



export const withDrawCircle = (svgProps) => SVGCanvas => {

  return (
    class DrawingCircleSVG extends Component {
      constructor(props) {
        super(props);

        this.state = {
          combinedProps: {
            figuresList: svgProps.figuresList,
            workMode: MODE_DRAWING,
            cbMouseClick: this.cbMouseClick,
            cbMouseMove: this.cbMouseMove
          },
          figureId: svgProps.figureId,
          curentFigureId: null, // id  фигуры, с которой идет работа
          firstPoint: null, //первая координата x,y
          startDrawing: false, // рисование не начато
        };

      }

      cbMouseClick = (x, y) => {
        console.log(`Клик x - ${x} y - ${y}`);

        if (this.state.firstPoint === null) {
          this.setState({ firstPoint: { x: x, y: y }, startDrawing: true, });

        } else {
          let newCircle = {
            figureType: FIGURE_CIRCLE,
            x1: this.state.firstPoint.x,
            y1: this.state.firstPoint.y,
            x2: x,
            y2: y,
            id: `circle-${this.state.figureId}`,
            key: this.state.figureId
          }
          svgProps.addSvgFigure(newCircle);
          svgProps.updateMaxId(this.state.figureId); // обновляем id В Redux
          this.setState({
            curentFigureId: null,
            firstPoint: null,
            startDrawing: false,
          });
        }


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

