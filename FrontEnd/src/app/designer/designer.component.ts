import {Component, ViewChild, ElementRef, Renderer} from '@angular/core';
import {Canvas} from '../Classes/canvas'
import {GUI} from '../Classes/gui'
import {Drawing} from "../Classes/drawing";
import {Workspace} from "../Classes/workspace";
import {DesignerService} from "../designer.service";
import {JsonCanvas} from "../Classes/json-canvas"

@Component({
  selector: 'app-designer',
  templateUrl: 'designer.component.html',
  styleUrls: ['./designer.component.sass']
})

export class DesignerComponent {
    private renderer: Renderer;
    public canvasArr: Canvas[];
    public activeCanvas: Canvas;
    public gui: GUI;
    public clipboard: any;

    //Variable to hold the error message, if occurs after any Rest request.
    public errorMessage: string;

    //Utility for async new workspace into view.
    public loading: boolean;

    //Utility to toggle sidemen
    public sideMenu: boolean;

    //Keeps track of current workspace, and all workspaces to be displayd.
    public workspace: Workspace;
    public allWorkspaces: Workspace[];

    //Keeps track of current View Stage, 'menu' or 'design'
    public stage: string;

    //testing
    public mockTime: string; // Just to get a known canvas.


    constructor(rend: Renderer, private http_: DesignerService) {
        this.stage = "menu";
        this.sideMenu = false;
        this.allWorkspaces = [];
        this.loading = true; // This is used for creating new elem.
        this.canvasArr = [];
        this.initWorkSpace();
        //this.newCanvas();
        this.renderer = rend;
        this.gui = new GUI();
        this.clipboard = null;
        this.mockTime = "19.01.2017 12:47:00"; //Testing

        //This is used for keyShortcuts
        this.renderer.listenGlobal('document', 'keydown', (event) => {
            this.analyzeKey(event);
        });

        //This is used for displaying input
        this.renderer.listenGlobal('document', 'mousedown', (event) => {
            this.displayVirtualInput(event);
        });
        //this.getWorkspace();

        //Testing
        this.getAllWorkspaces();
        //END Testing
    }
    //This is used to get the Dom elem of canvas parent elem.
    @ViewChild('canvasContainer') canvasRef: ElementRef;
    @ViewChild('textInput') textInput: ElementRef;

    ngAfterViewInit() {
        //this.refreshCanvasObject();
        //this.activeCanvas.gui = this.gui;
    };

    //LifeCycleHook, detects when a new canvas object has been created.
    ngAfterViewChecked() {
        if (this.canvasArr.length > 0) {
            this.refreshCanvasObject();
        }
    };

    public initWorkSpace(){
        this.workspace = new Workspace();
        this.workspace.title = "New Workspace";
        this.workspace.canvasArr.push(new Canvas());
        //this.newCanvas();
    }

    //Resto Functions
    public getAllWorkspaces(){
        this.http_.getAllwSpaces()
            .subscribe(
                workspaces => this.mapAllWorkspaces(workspaces),
                error => this.errorMessage = <any> error);
    }

    public getWorkspace() {
        this.http_.getWspace(this.mockTime)
            .subscribe(
                workspace => this.mapWorkspace(workspace),
                error => this.errorMessage = <any> error);
    }


    public mapAllWorkspaces(workspaces:any){
        for(let wSpace of workspaces){
           this.allWorkspaces.push(new Workspace(wSpace));
        }
        console.log(this.allWorkspaces);
    }

    public mapWorkspace(wSpace: Workspace) {
        this.stage = 'design';
        this.workspace = wSpace;
        for (let canvas of this.workspace.canvasArr) {
            let c = new Canvas();
            c.canvasHeight = canvas.canvasHeight;
            c.canvasWidth = canvas.canvasWidth;
            c.class = canvas.class;
            c.gui = this.gui;
            for (let drawing of canvas.allDrawings) {
                c.allDrawings.push(new Drawing(drawing));
            }
            this.activeCanvas = c;
            this.gui = this.activeCanvas.gui;
            this.canvasArr.push(c);
        }
        console.log(this.canvasArr[0]);
    }

    public updateWspace(){
        this.workspace.canvasArr =[];
        for(let canvas of this.canvasArr){
            this.workspace.canvasArr.push(new JsonCanvas(canvas));
        }
        this.workspace.dateModified = this.workspace.longDate();
        this.http_.deleteWspace(this.workspace)
            .subscribe(
                status => console.log(status),
                error => this.errorMessage = <any> error);
    }

    public save(){
        this.workspace.canvasArr =[];
        for(let canvas of this.canvasArr){
            this.workspace.canvasArr.push(new JsonCanvas(canvas));
        }
        //console.log(JSON.stringify(this.workspace));
        this.http_.createWspace(this.workspace)
            .subscribe(
                status => console.log(status),
                error => this.errorMessage = <any> error);
    }

    public openWorkspace(wSpace:Workspace){
        this.mapWorkspace(wSpace);

    }

    //Gui Functionality
    public newCanvas() {
        let can = new Canvas();
        can.gui = this.gui;
        this.canvasArr.push(can);
        this.activeCanvas = this.canvasArr[this.canvasArr.length - 1];
    }

    public refreshCanvasObject() {
        let i = 0;
        for (let child of this.canvasRef.nativeElement.children) {
            this.canvasArr[i].rawCanvasObj = child;
            this.canvasArr[i].renderContext = child.getContext("2d");
            i++;
        }

        let x = this;
        if (this.loading) {
            setTimeout(function() {
                x.refreshCanvas();
            }, 250);
        }
    }

    public logJsonTest() {
        console.log("U pressed this button, but why?");
    }

    public refreshCanvas() {
        for (let canvas of this.canvasArr) {
            canvas.redrawCanvas();
        }
        this.loading = false;
    }

    public refreshGui() {
        this.activeCanvas.setToolClass(this.gui);
    }

    public toggleSideMenu() {
        this.sideMenu = !this.sideMenu;
    }

    public setSideMenuOff() {
        this.sideMenu = false;
    }

    public displayFill(tool) {
        if (tool != 'text' && tool != 'line') {
            return true;
        }
        return false;
    }

    public displayBorder(tool) {
        if (tool != 'text') {
            return true;
        }
        return false;
    }

    public displayBrushStyle(tool) {
        if (tool == 'pen' || tool == 'line') {
            return true;
        }
        return false;
    }

    public displayTextMenu(tool) {
        if (tool == 'text') {
            return true;
        }
        return false;
    }

    public getFaIconClass(bully) {
        if (bully) {
            return "fa fa-check-square";
        } else {
            return "fa fa-square-o";
        }
    }

    public toogleHasColor(val) {
        if (val == 'fill') {
            this.activeCanvas.activeDrawing.gui.hasFill = !this.activeCanvas.activeDrawing.gui.hasFill;
        } else {
            this.activeCanvas.activeDrawing.gui.hasBorder = !this.activeCanvas.activeDrawing.gui.hasBorder;
        }
        this.activeCanvas.redrawCanvas();
    }

    public toggleFontStyle(val) {
        if (val == 'bold') {
            this.gui.fonty.bold = !this.gui.fonty.bold;
            this.activeCanvas.activeDrawing.gui.fonty.bold = !this.activeCanvas.activeDrawing.gui.fonty.bold;
        } else {
            this.gui.fonty.italic = !this.gui.fonty.italic;
            this.activeCanvas.activeDrawing.gui.fonty.italic = !this.activeCanvas.activeDrawing.gui.fonty.italic;
        }
        this.activeCanvas.redrawCanvas();
    }

    public setColor(value, val) {
        if (val == 'stroke') {
            this.gui.strokeStyle = value;
            this.activeCanvas.activeDrawing.gui.strokeStyle = value;
            this.activeCanvas.activeDrawing.gui.hasBorder = true;
        } else {
            this.gui.fillStyle = value;
            this.activeCanvas.activeDrawing.gui.fillStyle = value;
            this.activeCanvas.activeDrawing.gui.hasFill = true;
        }
        this.activeCanvas.redrawCanvas();
    }

    public changeOpacity($event) {
        this.activeCanvas.activeDrawing.gui.opacity = $event.target.value;
        this.activeCanvas.redrawCanvas();
    }

    public changeCanvas(canvas) {
        this.activeCanvas = canvas;
        canvas.gui = this.gui;
    }

    public changeLineWidth($event) {
        this.gui.lineWidth = $event.target.value;
        this.activeCanvas.activeDrawing.gui.lineWidth = $event.target.value;
        this.activeCanvas.redrawCanvas();
    }

    public changeFontSize($event) {
        this.gui.fonty.fontSize = $event.target.value;
        this.activeCanvas.activeDrawing.gui.fonty.fontSize = $event.target.value;
        this.activeCanvas.redrawCanvas();
    }

    public changeLineCap(value) {
        this.activeCanvas.activeDrawing.gui.lineCap = value;
        this.activeCanvas.activeDrawing.gui.lineJoin = value;
        this.activeCanvas.redrawCanvas();
    }

    public changeTool(value) {
        if (value != "text") {
            this.textInput.nativeElement.style.display = 'none';
        }
        this.gui.tool = value;
        this.refreshGui();
    }

    public changeFontFamily(value) {
        this.activeCanvas.gui.fonty.font = value;
        this.activeCanvas.activeDrawing.gui.fonty.font = value;
        this.activeCanvas.redrawCanvas();
    }

    public undoRedo(action) {
        if (action == 'undo') {
            this.activeCanvas.undoDrawing();
        } else {
            this.activeCanvas.redoDrawing();
        }
    }

    public displayVirtualInput(event: any) {
        //console.log(this.textInput.nativeElement.style.display);
        //first we check if user input is on the canvas

        if (this.gui.tool == 'text' && this.VirtualInCanvas(this.activeCanvas.rawCanvasObj, event.pageX, event.pageY)) {
            if (this.textInput.nativeElement.style.display != 'block') {
                let left = event.pageX + "px";
                let top = event.pageY + "px";
                this.textInput.nativeElement.style.position = 'absolute';
                this.textInput.nativeElement.style.top = top;
                this.textInput.nativeElement.style.left = left;
                this.textInput.nativeElement.style.display = 'block';
                this.textInput.nativeElement.style.color = this.activeCanvas.gui.strokeStyle;
                this.textInput.nativeElement.style.font = this.activeCanvas.gui.fonty.font;
                //console.log(this.textInput.nativeElement.id);
            }
            //now we check if user is trying to click away from the input
            else {
                if (!this.VirtualInCanvas(this.textInput.nativeElement, event.pageX, event.pageY)) {
                    this.hideVirtual();
                }
            }

        }
    }

    public hideVirtual() {
        if (this.textInput.nativeElement.value == "") {
            this.textInput.nativeElement.value = "New Text";
        }
        this.activeCanvas.newText(this.textInput.nativeElement.value, this.textInput.nativeElement.offsetLeft, this.textInput.nativeElement.offsetTop);
        this.textInput.nativeElement.value = "";
        this.textInput.nativeElement.style.display = 'none';
    }

    public deleteDrawing() {
        if (this.gui.tool == 'select') {
            if (this.activeCanvas.allDrawings[this.activeCanvas.allDrawings.length - 1].startX != null) {
                this.activeCanvas.removeLast();
            }
        }
    }

    public VirtualInCanvas(rawObject: HTMLElement, x, y) {
        if (rawObject.offsetLeft <= x && x <=
            (rawObject.offsetLeft + rawObject.offsetWidth) &&
            rawObject.offsetTop <= y &&
            y <= (rawObject.offsetTop + rawObject.offsetHeight)) {
            return true;
        }
        return false;
    }

    public analyzeKey(event: any) {
        let key = event.key;
        if (this.gui.tool == 'text' && this.textInput.nativeElement.style.display == 'block') {
            if (key.toLowerCase() == 'enter') {
                this.hideVirtual();
            }
            return;
        }
        switch (key.toLowerCase()) {
            case "s":
                this.changeTool('select');
                break;
            case "b":
                this.changeTool('pen');
                break;
            case "r":
                this.changeTool('square');
                break;
            case "c":
                if (!event.ctrlKey) {
                    this.changeTool('circle');
                } else {
                    if (this.gui.tool == 'select') {
                        if (this.activeCanvas.activeDrawing.startX != null) {
                            this.clipboard = this.activeCanvas.activeDrawing;
                        }
                    }
                }
                break;
            case "v":
                if (event.ctrlKey && this.clipboard != null) {
                    let copiedDrawing = new Drawing(JSON.parse(JSON.stringify(this.clipboard)));
                    this.activeCanvas.allDrawings.push(copiedDrawing);
                    this.activeCanvas.redrawCanvas();
                }
                break;
            case "delete":
                this.deleteDrawing();
                break
            case "l":
                this.changeTool('line');
                break;
            case "t":
                this.changeTool('text');
                break;
            case "e":
                this.changeTool('eraser');
                break;
            case "z":
                if (event.ctrlKey) {
                    this.undoRedo('undo');
                }
                break;
            case "y":
                if (event.ctrlKey) {
                    this.undoRedo('redo');
                }
                break;
            case "a":
                this.newCanvas();
        }
    }

}
