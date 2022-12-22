import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PigListComponent } from './pig-list/pig-list.component';
import { PigAddFormComponent } from './pig-add-form/pig-add-form.component';
import { RoutingModule } from './routing.module'
import { HttpClientModule } from '@angular/common/http';
import { PigMoreInfoComponent } from './pig-more-info/pig-more-info.component';
import { CountReportsPipe } from './count-reports.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PigListComponent,
    PigAddFormComponent,
    PigMoreInfoComponent,
    CountReportsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
