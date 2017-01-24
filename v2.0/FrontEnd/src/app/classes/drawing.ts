import {Position} from './position';
import {Gui} from './gui';


export class Drawing {
    public gui: Gui;
    public currPos: Position;

    constructor (obj?) {
        this.gui = new Gui();
        this.currPos = new Position();

        for (let prop in obj) {
            if(prop == 'gui') {
                this[prop] = obj[prop];
            }
            if(prop == 'currPos') {
                this[prop] = new Position(obj[prop]);
            }
        }
    }
}
