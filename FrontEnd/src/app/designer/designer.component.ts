import {Component, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-designer',
  template: `<canvas #sketchCanvas class='sketchCanvas'
  [attr.width]='_size'
  [attr.height]='_size'></canvas>`,
  styleUrls: ['./designer.component.sass']
})

export class DesignerComponent {
  private _size: number;

  @ViewChild("sketchCanvas") sketchCanvas: ElementRef;

  constructor(){
    this._size = 150;
  }

  ngAfterViewInit() {
    let context: CanvasRenderingContext2D = this.sketchCanvas.nativeElement.getContext("2d");
    context.fillStyle = 'green';
    context.fillRect(0, 0, 150, 150);
  }

  get size(){
    return this._size;
  }

  @Input () set size(newValue: number){
    this._size = Math.floor(newValue);
  }
}
