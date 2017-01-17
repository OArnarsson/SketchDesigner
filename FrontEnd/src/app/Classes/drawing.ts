import {GUI} from '../Classes/gui'
import {Selection} from '../Classes/selection'


export class Drawing {
  public tool: string;
  public startX: number;
  public startY: number;
  public endX: number;
  public endY: number;
  public posX: number[];
  public posY: number[];
  public moveXby: number;
  public moveYby: number;
  public value: string;
  public found: boolean;
  public selection: Selection;
  public gui: GUI;


    constructor(){
      this.gui = new GUI();
      this.tool = this.gui.tool.toString();
      this.posX = [];
      this.posY = [];
      this.moveXby = 0;
      this.moveYby = 0;
      this.value = "";
    }

  startPos(x, y) {
    this.startX = x;
    this.startY = y;
  }

  endPos(x, y) {
    if(this.tool == 'square') {
      this.endX = x - this.startX;
      this.endY = y - this.startY;
    }

    else {
      this.endX = x;
      this.endY = y;
    }
  }

  movePos(x, y){
    this.moveXby = x;
    this.moveYby = y;
  }

    pushPos(x, y) {
      this.posX.push(x);
      this.posY.push(y);
    }

    setBoxSize(x, y) {
        if(x < this.startX){
            this.startX = x;
        }
        if(x> this.endX){
            this.endX = x;
        }
        if(y < this.startY){
            this.startY = y;
        }
        if(y> this.endY){
            this.endY = y;
        }
    }
}

