import { Component, useState } from 'react';
import { FIGURE_CIRCLE, FIGURE_POLYGON, FIGURE_RECT, MODE_EDIT, MODE_MOVE_FIGURE, MODE_RESIZE_FIGURE } from '../constants';



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
            cbMouseDown: this.cbMouseDown,
            cbMouseUp: this.cbMouseUp,
            imageSize: svgProps.imageSize,
            figureColors: svgProps.figureColors,
            setCurrentFigureId: svgProps.setCurrentFigureId, // устанавливаем по клику id текущей фигуры
            currentFigureId: svgProps.currentFigureId,
          },
          figureId: svgProps.figureId,
          firstPoint: null, //первая координата x,y
          startDrawing: false, // рисование не начато
          initialCoordinates: null, // начальное положение фигры которую будут двигать
          workMode: null,
          currentFigure: null, //фигура, которую нужно двигать
          currentFigureIndex: null, //индекс фигуры в массиве фигур
          currentFigureControlId: null, // индекс управляющего элемента формы
        };

      }

      cbMouseDown = (x, y, areaId) => {

        // запоминаем начальные координаты
        // относительно которых нужно менять положение области
        const initialCoordinates = { x, y };
        // если установлена id текущей фигуры находим и сохраняем с стейте
        let figure = null;
        let figureIndex = null;
       
        if (areaId) {
          // проверка не хотим ли мы изменить размеры фигуры

          const isControl = areaId.search(/^[a-z]+-\d-\d/) > -1;
          
          let figureId = null;
          if (isControl) {
            const result = areaId.match(/^[a-z]+-\d/);
            figureId = result[0];

          } else {
            figureId = areaId;
          }

          figureIndex = svgProps.figuresList.findIndex(item => {
            return item.id == figureId ? true : false;
          });

          figure = svgProps.figuresList[figureIndex];
          svgProps.setCurrentFigureId(figureId);

          // устанавливаем дальнейший режим работы
          // Изменение размеров путем перетаскивания control или перемещение фигуры


          this.setState({
            initialCoordinates,
            workMode: isControl ? MODE_RESIZE_FIGURE : MODE_MOVE_FIGURE,
            currentFigure: figure,
            currentFigureIndex: figureIndex,
            currentFigureControlId: isControl ? areaId : null,
          });
        }


      }


      cbMouseUp = () => {
        if (this.state.workMode == MODE_MOVE_FIGURE || this.state.workMode == MODE_RESIZE_FIGURE) {
          this.setState({ initialCoordinates: null, workMode: MODE_EDIT });
          // сохраняем окончательное положение фигуры из переданного в svgCanvas
          svgProps.updateSvgFigure(this.state.combinedProps.figuresList[this.state.currentFigureIndex]);
        }

      }

      cbMouseClick = (x, y) => {

      }

      cbMouseMove = (x, y) => {

        const figure = { ...this.state.currentFigure };
        const figuresList = [...this.state.combinedProps.figuresList];
        let combinedProps = null;

        switch (this.state.workMode) {
          
          case MODE_MOVE_FIGURE:
            // меняем координаты фигуры
            
            this.moveFigure(figure, x - this.state.initialCoordinates.x, y - this.state.initialCoordinates.y);

            
            // меняем на измененную фигуру


            figuresList.splice(this.state.currentFigureIndex, 1, figure);
            combinedProps = { ...this.state.combinedProps, figuresList };
            this.setState({ combinedProps });
            break;
          case MODE_RESIZE_FIGURE:
            this.resizeFigure(figure, x - this.state.initialCoordinates.x, y - this.state.initialCoordinates.y)
            
            figuresList.splice(this.state.currentFigureIndex, 1, figure);
            combinedProps = { ...this.state.combinedProps, figuresList };
            this.setState({ combinedProps });
            break;

          default:
            break;
        }


      }

      moveFigure(figure, dX, dY) {
        switch (figure.figureType) {
          case FIGURE_RECT:
            figure.x1 += dX;
            figure.x2 += dX;
            figure.y1 += dY;
            figure.y2 += dY;

            break;
          case FIGURE_CIRCLE:
            figure.x1 += dX;
            figure.x2 += dX;
            figure.y1 += dY;
            figure.y2 += dY;

            break;
          case FIGURE_POLYGON:
            const changedPoints = figure.points.map((item, index) => {
              // нечетным элементам прибавляем dx четным dy

              if ((index + 1) % 2) {
                item = item + dX;
              } else {
                item = item + dY;
              }

              return item;

            });
            
            figure.points = changedPoints;

            break;

          default:
            break;
        }
      }

      resizeFigure(figure, dX, dY) {
        
        const { currentFigureControlId } = this.state;
        const controlNumber = parseInt(currentFigureControlId.split('-').pop());
        switch (figure.figureType) {
          case FIGURE_RECT:
            
            if (controlNumber == 1) {
              figure.x1 += dX;
              figure.y1 += dY;
            } else {
              figure.x2 += dX;
              figure.y2 += dY;
            }
            break;

          case FIGURE_CIRCLE:
            if (controlNumber == 1) {
              figure.x1 += dX;
              figure.y1 += dY;
            } else {
              figure.x2 += dX;
              figure.y2 += dY;
            }           

            break;
          case FIGURE_POLYGON:
            //массив точек содержит 0 и четные элементы - коррдинаты x
            // нечетные y 
            // отсюда находим к какому элементу массива обращаться
            
            const changedPoints =  figure.points.slice();

            changedPoints[controlNumber*2] += dX;
            changedPoints[controlNumber*2 + 1] += dY;
                      
            figure.points = changedPoints;

            break;

          default:
            break;
        }
      }

      // возвращает копию текущей фигуры
      getFigureById(id) {
        const figureId = svgProps.figuresList.findIndex(item => {
          return item.id == id ? true : false;
        })
        return { ...svgProps.figuresList[figureId] };

      }

      render() {
        return (
          <SVGCanvas {...this.state.combinedProps} />
        );

      }
    }
  )
}


