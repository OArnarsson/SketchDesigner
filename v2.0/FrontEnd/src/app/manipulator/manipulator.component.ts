import { Component, OnInit, Input } from '@angular/core';
import {Manipulator} from './manipulator';
import {ManipulatorService} from './manipulator.service'
import {Workspace} from '../classes/workspace'

@Component({
  selector: 'canvasContainer',
  templateUrl: './manipulator.component.html',
  styleUrls: ['./manipulator.component.sass']
})
export class ManipulatorComponent implements OnInit {
    private man:Manipulator;
    private errorMsg:any;
    @Input() param: string;

    //Check the errors: http://localhost:4200/workspace/24.01.2017%2020%3A02%3A33%3A112
    constructor(private http:ManipulatorService) {
        this.man = new Manipulator(null);
    }
    ngOnInit() {
        this.http.getWspace(this.param)
            .subscribe(
                wSpace => this.man = new Manipulator(wSpace),
                error => this.errorMsg = <any>error);

    }
    public testLog(){
        console.log(this.man);
    }

    public testUpdate(){
        this.man.workspace.title = "Jonatan";
        this.http.updateWspace(this.man.workspace)
            .subscribe(
                data => this.man.workspace.dateModified = data.dateModified,
                error => this.errorMsg = <any>error);
    }

}
