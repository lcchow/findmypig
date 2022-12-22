import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PigService } from './pig.service';
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'Missing Pig Tracker';

  constructor(private ps:PigService, private route:ActivatedRoute) {}


}
