import { Component, OnInit, Input, ViewChild, ElementRef, Renderer  } from '@angular/core';
import { Manipulator } from './manipulator';
import { ManipulatorService } from './manipulator.service'
import { Workspace } from '../classes/workspace';
import { Canvas } from '../classes/canvas';
import { Drawing } from '../classes/drawing';



@Component({
    selector: 'canvasContainer',
    templateUrl: './manipulator.component.html',
    styleUrls: ['./manipulator.component.sass']
})
export class ManipulatorComponent implements OnInit {
    private man: Manipulator;
    private errorMsg: any;
    @Input() param: string;

    constructor(private http: ManipulatorService) {
        this.man = new Manipulator(null);
    }

    ngOnInit() {
        this.http.getWspace(this.param)
            .subscribe(
            wSpace => this.man = new Manipulator(wSpace),
            error => this.errorMsg = <any>error);
    }

    ngAfterViewChecked() {
        this.refreshCanvasObject();
    };

    @ViewChild('canvasContainer') canvasRef: ElementRef;
    @ViewChild('textInput') textInput: ElementRef;

    public refreshCanvasObject() {
        let i = 0;
        for (let child of this.canvasRef.nativeElement.children) {
            this.man.workspace.canvases[i].rawCanvasObj = child;
            this.man.workspace.canvases[i].renderContext = child.getContext("2d");
            i++;
        }
    }


    public testLog() {
        console.log(this.man);
        console.log(JSON.stringify(this.man.activeCanvas.drawings[0]));
    }

    public addCanvas() {
        this.man.workspace.canvases.push(new Canvas());
    }


    public testUpdate() {
        this.http.updateWspace(this.man.workspace)
            .subscribe(
            data => this.man.workspace.dateModified = data.dateModified,
            error => this.errorMsg = <any>error);
    }

}
