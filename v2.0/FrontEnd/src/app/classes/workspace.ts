import { Canvas } from './canvas';


export class Workspace {
    public canvases: Canvas[];
    public title: string;
    public dateModified: string;
    public dateCreated: string;
    //AuthO?

    public constructor(obj?) {
        this.canvases = [];
        this.title = 'Untitled';
        this.dateModified = '';
        this.dateCreated = '';

        for (let prop in obj) {
            if (prop == 'canvases') {
                for (let canvas of obj[prop]) {
                    this.canvases.push(new Canvas(canvas));
                }
            }
            else {
                this[prop] = obj[prop];
            }
        }
    }
}
