import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PigAddFormComponent } from './pig-add-form/pig-add-form.component';
import { PigListComponent } from './pig-list/pig-list.component'
import { PigMoreInfoComponent } from './pig-more-info/pig-more-info.component'
import { ReportsResolver } from './reports.resolver'
import { AppComponent } from './app.component'
import { MapMarkersResolver } from './map-markers.resolver'



const appRoutes:Routes = [
  { path: '', 
    component: PigListComponent, 
    resolve: { message: ReportsResolver }},

  { path: 'add', 
  component: PigAddFormComponent,
  resolve: { message: MapMarkersResolver }},

  { path: 'moreinfo', component: PigMoreInfoComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
