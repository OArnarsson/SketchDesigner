import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
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
    @ViewChild('canvasContainer') canvasRef: ElementRef;
    @ViewChild('textInput') textInput: ElementRef;

    constructor(private http: ManipulatorService, private rend: Renderer) {
        this.man = new Manipulator(new Workspace());

        this.rend.listenGlobal('document', 'change', (event) => {
            console.log(event);
        });
    }

    ngOnInit() {
        setTimeout(() => {
            for (let canvas of this.man.workspace. canvases) {
                canvas.redrawCanvas();
            }
        }, 300);

        this.http.getWspace(this.param)
            .subscribe(
            wSpace => this.man = new Manipulator(wSpace),
            error => this.errorMsg = <any>error);
    }

    ngAfterViewChecked() {
        this.refreshCanvasObject();
    };


    public refreshCanvasObject() {
        let workspace = this.man.workspace;
        let i = 0;
        for (let child of this.canvasRef.nativeElement.children) {
            workspace.canvases[i].rawCanvasObj = child;
            workspace.canvases[i].renderContext = child.getContext("2d");
            i++;
        }
        console.log('bingo');
    }

    //Testing 
    public testLog() {
        console.log(JSON.stringify(this.man.workspace));
    }

    public addCanvas() {
        this.man.workspace.canvases.push(new Canvas());
    }

    public setSquare() {
        this.man.gui.tool = 'square';
    }

    public setCircle() {
        this.man.gui.tool = 'circle';
    }

    public setLine() {
        this.man.gui.tool = 'line';
    }

    public removeCanvas() {
        this.man.workspace.canvases.splice(this.man.workspace.canvases.indexOf(this.man.activeCanvas, 1));
    }

    public testUpdate() {
        for (let canvas of this.man.workspace.canvases) {
            canvas.renderContext = '';
            canvas.rawCanvasObj = '';
        }

        this.http.updateWspace(this.man.workspace)
            .subscribe(
            data => this.man.workspace.dateModified = data.dateModified,
            error => this.errorMsg = <any>error);
    }
    public testClear() {
        for (let canvas of this.man.workspace.canvases) {
            canvas.renderContext = '';
            canvas.rawCanvasObj = '';
        }

        console.log(JSON.stringify(this.man.workspace));
    }
}
