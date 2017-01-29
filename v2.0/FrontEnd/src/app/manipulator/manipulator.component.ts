import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router} from '@angular/router'
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
    public hiddenSideBar:boolean; //Used for displaying Sidebar
    public hiddenModal:boolean; //Used for displaying Modal
    public modalTitle:string;
    public restAction:string;
    public modalBtnLeft:string;
    public modalBtnRight:string;

    @Input() date: string;
    @ViewChild('canvasContainer') canvasRef: ElementRef;
    @ViewChild('textInput') textInput: ElementRef;
    @ViewChild('saveVis') saveVis: ElementRef;
    @ViewChild('textVis') textVis: ElementRef;

    constructor(private http: ManipulatorService, private rend: Renderer, private router: Router) {
        this.man = new Manipulator(new Workspace());
        this.modalBtnLeft = "Save";
        this.modalBtnRight = "Cancel";
        this.hiddenSideBar = true;
        this.hiddenModal = true;
        this.modalTitle = "";
        this.restAction = "";


        this.rend.listenGlobal('document', 'mousedown', (event) => {
            this.displayVirtualInput(event);
        });
    }

    ngOnInit() {
        this.renderCanvases();

        this.http.getWspace(this.date)
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
        for (let child of this.canvasRef.nativeElement.querySelectorAll('canvas')) {
            workspace.canvases[i].rawCanvasObj = child;
            workspace.canvases[i].renderContext = child.getContext("2d");
            i++;
        }
    }

    public renderCanvases() {
        setTimeout(() => {
            for (let canvas of this.man.workspace.canvases) {
                canvas.redrawCanvas();
            }
        }, 1000);
    }

    /*
        *VIEW FUNCTIONS
    */

    /* SideBar */
    public toggleLeftSidebar(){
        this.hiddenSideBar = !this.hiddenSideBar;
    }
    public hideLeftSideBar(){
        this.hiddenSideBar = true;
    }
    /* End SideBar */

    /* Modal */
    public displayModal(){
        this.hiddenModal = false;
    }
    public hideModal(any?){
        if(this.restAction == 'new' && any == 'btn'){
            this.restSwitch(false);
        }
        if(this.restAction == 'exit' && any == 'btn'){
            this.router.navigate(['/']);
        }

        this.hiddenModal = true;
    }
    /* End Modal */

    /* Save Visual */
    public showSaveVis(){
        this.saveVis.nativeElement.style.marginTop = '15%';
        let that = this;
        setTimeout(function(){
            that.saveVis.nativeElement.style.marginTop = '-10%';
        }, 2000);
    }

    /* End Save Visual */

    /* Visual TextBox*/
    public displayVirtualInput(event: any) {
        //first we check if user input is on the canvas
        if (this.man.gui.tool == 'text' && this.VirtualInCanvas(this.man.activeCanvas.rawCanvasObj, event.pageX, event.pageY)) {
            if (this.textInput.nativeElement.style.display != 'block') {
                let left = event.pageX + "px";
                let top = event.pageY + "px";
                this.textInput.nativeElement.style.position = 'absolute';
                this.textInput.nativeElement.style.top = top;
                this.textInput.nativeElement.style.left = left;
                this.textInput.nativeElement.style.display = 'block';
                this.textInput.nativeElement.style.color = this.man.gui.strokeStyle;
                this.textInput.nativeElement.style.font = this.man.gui.textprops.font;
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
        this.man.newText(this.textInput.nativeElement.value, this.textInput.nativeElement.offsetLeft, this.textInput.nativeElement.offsetTop);
        this.textInput.nativeElement.value = "";
        this.textInput.nativeElement.style.display = 'none';
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
    /* END Visual TextBox*/

    /*
        *END VIEW FUNCTIONS
     */


    /*
        *CRUD REST FUNCTIONS
     */
    public crudAction(modalTitle,action){
        this.hideLeftSideBar();
        this.modalTitle = modalTitle;
        this.restAction = action;
        if(action == 'save'){
            this.showSaveVis();
            this.saveWorkspace();
            return;
        }
        if(action != 'saveAs'){
            this.modalBtnLeft = 'Yes';
            this.modalBtnRight = 'No';
        }
        else{
            this.modalBtnLeft = "Save";
            this.modalBtnRight = "Cancel";
        }

        this.displayModal();

    }

    public restSwitch(any?){
        switch(this.restAction){
            case 'new':
                if(any){
                    this.saveWorkspace();
                }
                this.getNewWorkspace();
                this.router.navigate(['/workspace/new']);
                break;
            case 'saveAs':
                this.saveWorkspace();
                break;
            case 'exit':
                this.saveWorkspace();
                this.router.navigate(['/menu']);
                break;
            case 'delete':
                this.deleteWorkspace();
                this.router.ngOnDestroy();
                this.router.navigate(['/menu']);
                break;
        }
        this.hideModal();
    }
    public saveWorkspace(){
        for (let canvas of this.man.workspace.canvases) {
            canvas.renderContext = '';
            canvas.rawCanvasObj = '';
        }

        this.http.updateWspace(this.man.workspace)
            .subscribe(
                data => this.man.workspace.dateModified = data.dateModified,
                error => this.errorMsg = <any>error);
    }

    public deleteWorkspace(){
        for (let canvas of this.man.workspace.canvases) {
            canvas.renderContext = '';
            canvas.rawCanvasObj = '';
        }
        this.http.deleteWspace(this.man.workspace)
            .subscribe(
                data => this.man.workspace.dateModified = data.dateModified,
                error => this.errorMsg = <any>error);
    }

    public getNewWorkspace(){
        this.http.getWspace('new')
            .subscribe(
                wSpace => this.man = new Manipulator(wSpace),
                error => this.errorMsg = <any>error);
    }

    /*
        *END CRUD REST FUNCTIONS
     */




    public addCanvas() {
        this.man.workspace.canvases.push(new Canvas());
    }


    public undoRedo() {
        //TODO!
    }



    public removeDrawing() {
        if (this.man.selectedDrawings.length > 0)
            for (let drawing of this.man.selectedDrawings)
                this.man.activeCanvas.drawings.splice(this.man.activeCanvas.drawings.indexOf(drawing), 1);
        this.man.selectionZone = new Drawing();
        this.man.activeCanvas.redrawCanvas();
    }


}
