import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'

@Component({
  selector: 'app-pig-more-info',
  templateUrl: './pig-more-info.component.html',
  styleUrls: ['./pig-more-info.component.css']
})
export class PigMoreInfoComponent {
  added_on: any
  name: any
  phoneNo: any
  pid: any
  breed: any
  locName: any
  long: any
  lat: any
  notes: any
  status: any

  constructor(private ActivatedRoute:ActivatedRoute, private router:Router) {
  }

  ngOnInit():void {
    this.added_on = this.ActivatedRoute.snapshot.paramMap.get('added_on')
    this.name = this.ActivatedRoute.snapshot.paramMap.get('name')
    this.phoneNo = this.ActivatedRoute.snapshot.paramMap.get('phoneNo')
    this.pid = this.ActivatedRoute.snapshot.paramMap.get('pid')
    this.breed = this.ActivatedRoute.snapshot.paramMap.get('breed')
    this.locName = this.ActivatedRoute.snapshot.paramMap.get('locName')
    this.long = this.ActivatedRoute.snapshot.paramMap.get('long')
    this.lat = this.ActivatedRoute.snapshot.paramMap.get('lat')
    this.notes = this.ActivatedRoute.snapshot.paramMap.get('extraNote')
    this.status = this.ActivatedRoute.snapshot.paramMap.get('status')

    if (this.notes == 'null') {
      this.notes = "N/A"
    }

  }

  onBack(evt:any) {
    this.router.navigate(["/"]);
  }
}
