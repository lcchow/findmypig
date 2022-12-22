import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PigService } from './pig.service';


@Injectable({
  providedIn: 'root'
})
export class ReportsResolver implements Resolve<Observable<any>> {

  constructor(private ps:PigService) {}

  resolve(): Observable<any> {
    return this.ps.get();
  }
}
