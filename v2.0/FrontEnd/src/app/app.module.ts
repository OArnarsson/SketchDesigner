import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { MenuComponent } from './menu/menu.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DatePipe } from './pipes/date.pipe';
import { ManipulatorComponent } from './manipulator/manipulator.component';
import {ManipulatorService} from "./manipulator/manipulator.service";

import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WorkspaceComponent,
    DatePipe,
    ManipulatorComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ManipulatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
