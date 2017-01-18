import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DesignerComponent } from './designer/designer.component';
import { RouterModule, Routes } from '@angular/router';
import {ColorPickerModule} from 'angular2-color-picker';
import {DesignerService} from './designer.service';


const appRoutes: Routes = [
  {path: '', component: DesignerComponent},
  {path: '**', component: DesignerComponent}
]

@NgModule({
declarations: [
AppComponent,
DesignerComponent
],
imports: [
BrowserModule,
FormsModule,
HttpModule,
  RouterModule.forRoot(appRoutes),
    ColorPickerModule
],
providers: [DesignerService], //This talks to the API
bootstrap: [AppComponent]
})


export class AppModule { }
