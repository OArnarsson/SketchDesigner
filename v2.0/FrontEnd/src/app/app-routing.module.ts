import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const appRoutes: Routes = [
    {path: '', component: MenuComponent},
    {path: 'workspace/:date', component: WorkspaceComponent},
    {path: '**', component: MenuComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports:[
        RouterModule
    ],
  declarations: []
})
export class AppRoutingModule { }
