import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PigService } from './pig.service';

@Injectable({
  providedIn: 'root'
})
export class MapMarkersResolver implements Resolve<any> {
  constructor(private ps:PigService) {}

  resolve(): Observable<any> {
    return this.ps.getMapMarkers();
  }
}
