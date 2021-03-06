import { Component } from 'react';
import { FIGURE_RECT, MODE_DRAWING } from '../constants';



export const withDrawRect = (svgProps) => SVGCanvas => {

  return (
    class DrawingRectSVG extends Component {
      constructor(props) {
        super(props);

        this.state = {
          combinedProps: {
            figuresList: svgProps.figuresList,
            workMode: MODE_DRAWING,
            cbMouseClick: this.cbMouseClick,
            cbMouseMove: this.cbMouseMove,
            imageSize: svgProps.imageSize,
            figureColors: svgProps.figureColors,
            setCurrentFigureId: svgProps.setCurrentFigureId, // устанавливаем по клику id текущей фигуры
            currentFigureId: svgProps.currentFigureId,
            currentTool: svgProps.currentTool,
          },
          figureId: svgProps.figureId,
          curentFigureId: null, // id  фигуры, с которой идет работа
          firstPoint: null, //первая координата x,y
          startDrawing: false, // рисование не начато
        };

      }

      cbMouseClick = (x, y) => {
        
        if (this.state.firstPoint === null) {
          this.setState({ firstPoint: { x: x, y: y }, startDrawing: true, });

        } else {
          let newFigure = {
            figureType: FIGURE_RECT,
            x1: this.state.firstPoint.x,
            y1: this.state.firstPoint.y,
            x2: x,
            y2: y,
            id: `rect-${this.state.figureId}`,
            key: this.state.figureId,
            href: '',
            alt: '',
            linkTarget: '',
            drawing: false,
          }
          
          svgProps.addSvgFigure(newFigure);
          svgProps.setCurrentFigureId(`rect-${this.state.figureId}`);
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

        // // для наглядности что рисуем и где отрисовываем фигуры на mousemove
        // // если флаг startDrawing true - рисование начато никаких фигур еще нет. Добавляем фигуру

        if (this.state.startDrawing) {
          let newFigure = {
            figureType: FIGURE_RECT,
            x1: this.state.firstPoint.x,
            y1: this.state.firstPoint.y,
            x2: x,
            y2: y,
            id: `rect-${this.state.figureId}`,
            key: this.state.figureId,
            href: '',
            alt: '',
            linkTarget: '',
            drawing: true,
          }

          let newFigures = this.state.combinedProps.figuresList.slice();
          newFigures.push(newFigure);

          let newCombinedProps = { ...this.state.combinedProps, figuresList: newFigures };
          this.setState({
            startDrawing: false, // рисование продолжается фигура добавлена
            combinedProps: newCombinedProps,
          })
        } else if (this.state.firstPoint !== null) {
          let newFigures = this.state.combinedProps.figuresList.slice();
          newFigures.pop();
          newFigures.push({
            figureType: FIGURE_RECT,
            x1: this.state.firstPoint.x,
            y1: this.state.firstPoint.y,
            x2: x,
            y2: y,
            id: `rect-${this.state.figureId}`,
            key: this.state.figureId,
            href: '',
            alt: '',
            drawing: true,
            linkTarget: '',}
          );
          let newCombinedProps = { ...this.state.combinedProps, figuresList: newFigures };
          this.setState({ combinedProps: newCombinedProps });


        }

        

      }

      render() {
        return (
          
          <SVGCanvas {...this.state.combinedProps} />
        );

      }
    }
  )
}

