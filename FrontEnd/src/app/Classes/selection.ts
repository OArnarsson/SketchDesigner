export class Selection {

  public lowX: number;
  public lowY: number;
  public highX: number;
  public highY: number;
  private buffer: number;

  constructor(tool, startX: number, startY: number, endX: number, endY: number) {
    this.buffer = 10;

    if(tool == 'square'){
      if(startX < 0) {
        startX = endX + startX;
      }
      if(startY < 0) {
        startY = endY+startY;
      }

      endX = endX+startX;
      endY = endY+startY;
    }

    if(Math.abs(startX) > Math.abs(endX)) {
      this.lowX = Math.abs(endX - this.buffer);
      this.highX = Math.abs(startX + this.buffer);
    }
    else {
      this.lowX = Math.abs(startX - this.buffer);
      this.highX = Math.abs(endX + this.buffer);
    }
    if(Math.abs(startY) > Math.abs(endY)) {
      this.lowY = Math.abs(endY - this.buffer);
      this.highY = Math.abs(startY + this.buffer);
    }
    else {
      this.lowY = Math.abs(startY - this.buffer);
      this.highY = Math.abs(endY + this.buffer);
    }
  }

  movePos(x, y) {
    this.lowX += x;
    this.highX += x;
    this.lowY += y;
    this.highY += y;
  }

  topLeft() {
    return [this.lowX, this.highY];
  }

  topMiddle() {
    return [this.getWidth(), this.highY];
  }

  topRight() {
    return [this.highX, this.highY];
  }

  bottomLeft() {
    return [this.lowX, this.lowY];
  }

  bottomMiddle() {
    return [this.getWidth(), this.lowY];
  }

  bottomRight() {
    return [this.highX, this.lowY];
  }

  midLeft() {
    return [this.lowX, this.getHeight()];
  }

  midRight() {
    return [this.highX, this.getHeight()];
  }

  public getWidth(){
    return this.highX-this.lowX;
  }
  public getHeight(){
    return this.highY-this.lowY;
  }
}
