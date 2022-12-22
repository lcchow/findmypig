import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PigService } from '../pig.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent implements OnInit {
  form: FormGroup;
  mapMarkers: any[];
  data: any

  constructor(private ps: PigService, private router: Router, private route:ActivatedRoute) {
    this.mapMarkers = []
    
    let formControls = {
      name: new FormControl('',[
        Validators.required,
      ]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        //Validators.pattern("^[-0-9]*")
      ]),
      pid: new FormControl('',[
        Validators.required,
      ]),
      breed: new FormControl('',[
        Validators.required,
      ]),
      locNameSelect: new FormControl('',[
        Validators.required,
      ]),
      locName: new FormControl('', [
      ]),
      long: new FormControl('', [
      ]),
      lat: new FormControl('', [
      ]),
      extraNote: new FormControl()
    }
    this.form = new FormGroup(formControls)
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    let dataObjs = this.data.message;
    this.mapMarkers = dataObjs.data;
  }

  get phoneNo() {
    return this.form.controls['phoneNo']
  }

  get locNameSelect() {
    return this.form.controls['locNameSelect']
  }

  onSelect(evt:any){
    let selected = (<HTMLSelectElement>document.getElementById('locNameSelect')).value
    let locName = document.getElementById("locName");
    let lat = document.getElementById("lat");
    let long = document.getElementById("long");

    for (let i=0; i<this.mapMarkers.length; i++) {
      let cur = this.mapMarkers[i]
      if (selected == cur.locName) {
        (<HTMLInputElement>locName).value = selected;
        (<HTMLInputElement>lat).value = cur.lat;
        (<HTMLInputElement>long).value = cur.long;

        (<HTMLInputElement>locName).setAttribute("disabled","true");
        (<HTMLInputElement>lat).setAttribute("disabled","true");
        (<HTMLInputElement>long).setAttribute("disabled","true");
      }
    }

    if (selected == "Other") {
      (<HTMLInputElement>locName).value = "";
      (<HTMLInputElement>lat).value = "";
      (<HTMLInputElement>long).value = "";
      (<HTMLInputElement>locName).removeAttribute("disabled");
      (<HTMLInputElement>lat).removeAttribute("disabled");
      (<HTMLInputElement>long).removeAttribute("disabled");
    } 
  
  }

  onSubmit(values: any) {
    let locName = document.getElementById("locName");
    let lat = document.getElementById("lat");
    let long = document.getElementById("long");

    values.locName = (<HTMLInputElement>locName).value
    values.lat = (<HTMLInputElement>lat).value
    values.long = (<HTMLInputElement>long).value
    
    if (this.validLocation(values.locName,values.lat,values.long)==true) {
      let marker = {lat: Number(values.lat), long: Number(values.long), locName: values.locName}
      
      this.ps.add(values)
      this.ps.addMapMarker(marker)
      this.ps.updateData()
      this.router.navigate(["/"])
    } else {
      alert("Invalid location input: This location already exists.")
    }
  }

  validLocation (locName:any, lat:any, long:any) {
    for (let i=0; i<this.mapMarkers.length; i++) {
      let cur = this.mapMarkers[i]
      
      if (cur.locName == locName) {
        if (cur.lat== lat || cur.long == long) {
          return true
        } else {
          return false
        }
      } else if (cur.lat == lat && cur.long == long) {
        if (cur.locName != locName) {
          return false
        }
      }
    }
    return true
  }

  onCancel(evt:any) {
    this.router.navigate(["/"]);
  }

}

