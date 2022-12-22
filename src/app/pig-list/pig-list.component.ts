import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { PigService } from '../pig.service';
import { Router } from '@angular/router';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';


//Leaflet icons
import { icon, Marker } from 'leaflet';
import { TestScheduler } from 'rxjs/testing';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit, AfterViewInit {

  private map:any;

  mapMarkers = [ 
    {lat: 49.2276, long: -123.0076, locName: 'Metrotown'},
    {lat: 49.1867, long: -122.8490, locName: 'SFU Surrey'},
    {lat: 49.2667, long: -123.2500, locName: 'UBC'},
    {lat: 49.1888, long: -122.8058, locName: 'Guildford Town Centre'},
    {lat: 49.1714, long: -123.1508, locName: 'Richmond Oval'},
    {lat: 49.2768, long: -122.9180, locName: 'SFU Burnaby'}
  ]

  pig: any[];
  data: any

  constructor(private ps: PigService, private router: Router, private route:ActivatedRoute,private http:HttpClient) {
    this.pig = []
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data
    let dataObjs = this.data.message

    for (let i=0; i<dataObjs.length;i++) {
      if(dataObjs[i].key!="mapMarkers") {
        this.pig.push(dataObjs[i].data)
      } else if (dataObjs[i].key =="mapMarkers") {
         this.mapMarkers = dataObjs[i].data
      }
    }
  }

  ngAfterViewInit(): void { 
    this.map = L.map('mapid').setView([49.2, -123], 11); // lower mainlaid longitude & latitude

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hvd21laW56IiwiYSI6ImNsYjVlZGMwMjAyNTIzcXA1ZTB3N3lsMTIifQ.MZp8DWmHUe8KguLl3iMAsw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    for (let i = 0;i<this.mapMarkers.length;i++) {
      let current = this.mapMarkers[i]
      let reportCount = 0;      
      for (let j = 0; j<this.pig.length;j++) {
        if (this.pig[j].locName == current.locName) {
          reportCount++;
        }
      }
      L.marker([current.lat, current.long]).addTo(this.map)   
      .bindPopup(`<b>${current.locName}</b><br />${reportCount} cases reported.`).openPopup();
    }
  }

  onAdd(evt:any) {
    this.router.navigate(["/add"]);
  }

  onInfo(evt:any, pigReport:any) {
    this.router.navigate(["/moreinfo",pigReport]);
  }

  onRetrieve(evt:any, pigReport:any) {
    let password = prompt("Confirmation Required. Please enter the password to update status.")

    if (password == "OINK!!") {
      pigReport.status = "RETRIEVED"
      this.ps.edit(pigReport)
    } else {
        window.alert("Incorrect Password.")
    }
  }

  onDelete (evt:any, pigReport:any ) {
    evt["pigReport"] = pigReport
    let password = prompt("Confirmation Required. Please enter the password to delete report.")
    if (password == "OINK!!") {
      this.ps.delete(pigReport)
      this.router.navigate(["/"])
        .then(()=> {
          window.location.reload();
        })
    } else {
        window.alert("Incorrect Password.")
    }
  }

  sortLocation() {
    this.pig.sort(function(a,b) {
        let name1 = a.locName.toUpperCase()
        let name2 = b.locName.toUpperCase()
        if(name1<name2){
            return -1;
        }
        if(name1>name2){
            return 1;
        }
        return 0;
    })
  }

  sortName() {
    this.pig.sort(function(a,b) {
        let name1 = a.name.toUpperCase()
        let name2 = b.name.toUpperCase()
        if(name1<name2){
            return -1;
        }
        if(name1>name2){
            return 1;
        }
        return 0;
    })
  }

  sortAddedOn() {
    this.pig.sort(function(a,b) {
      return (a.added_on-b.added_on)
    })
  }


}
