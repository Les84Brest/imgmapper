import { Component } from 'react';
import { FIGURE_POLYGON, MODE_DRAWING } from '../constants';



export const withDrawPoly = (svgProps) => SVGCanvas => {

  return (
    class DrawingPolySVG extends Component {
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
          },
          figureId: svgProps.figureId,
          curentFigureId: null, // id  фигуры, с которой идет работа
          currentPoly: null, //первая координата x,y
          startDrawing: false, // рисование не начато
        };

      }

      cbMouseClick = (x, y, ctrlKey) => {
        console.log(`Клик x - ${x} y - ${y}`);

        if (this.state.currentPoly === null) {
          let newFigure = {
            figureType: FIGURE_POLYGON,
            points: [x, y],
            id: `poly-${this.state.figureId}`,
            key: this.state.figureId,
            href: '',
            alt: '',
            linkTarget: '',
          };
          // пока добавляем фигуру в список для SVGCanvas
          let newFiguresList = this.state.combinedProps.figuresList.slice();
          newFiguresList.push(newFigure);
          let newCombinedProps = {...this.state.combinedProps, figuresList: newFiguresList}
          
          this.setState({ 
            currentPoly: newFigure, 
            startDrawing: true,
            combinedProps: newCombinedProps,
          });

        } else {
          
          let newFigure = {...this.state.currentPoly};
          
          newFigure.points.push(x);
          newFigure.points.push(y);
          if (ctrlKey){ //создание фигуры завершено сохраняем ее
            svgProps.addSvgFigure(newFigure);
            svgProps.updateMaxId(this.state.figureId); // обновляем id В Redux
            svgProps.setCurrentFigureId(`poly-${this.state.figureId}`);
            this.setState({startDrawing: false, currentPoly: null});
            return;
          }else{// продолжаем рисование фигуры

            let newFiguresList = this.state.combinedProps.figuresList.slice();
            newFiguresList.pop();
            newFiguresList.push(newFigure);
            let newCombinedProps = {...this.state.combinedProps, figuresList: newFiguresList}
            
            this.setState({ 
              currentPoly: newFigure, 
              combinedProps: newCombinedProps,
            });
            
          }

          
          
          // svgProps.addSvgFigure(newFigure);
          // svgProps.updateMaxId(this.state.figureId); // обновляем id В Redux
          // this.setState({
          //   curentFigureId: null,
          //   firstPoint: null,
          //   startDrawing: false,
          // });
        }


      }

      cbMouseMove = (x, y, ctrlKey) => {
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

