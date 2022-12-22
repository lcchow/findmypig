import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PigService implements OnInit {

  pigList:any[]=[];

  constructor(private http:HttpClient) { 
  }

  ngOnInit(): void {
  }

  // get() {
  //   return this.pigList
  // }

  get() {
    return this.http.get<Object>('https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/')
  }

  getMapMarkers() {
    return this.http.get<Object>('https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/mapMarkers')
  }

  updateData() {
    this.pigList=[]
    this.http.get<Object>('https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/')
    .subscribe((inc:any)=>{
      for (let i = 0; i<inc.length;i++) {
        let ref = inc[i].data
        //console.log("updataData",ref)
        //this.pigList.push(ref)
        this.pigList[i] = ref
      }
    })
  }

  add(pigReport:any) {
    pigReport.added_on = (new Date()).getTime()
    pigReport.status = "READY FOR PICKUP"
    //this.pigList.push(pigReport)
    let reportName = pigReport.pid+"-"+pigReport.added_on
    this.http.post('https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/',
    {"key":reportName, "data":pigReport}
    ).subscribe((data:any)=>{
    })
  }

  addMapMarker(marker:any){
    let mapMarkers = [ 
      {lat: 49.2276, long: -123.0076, locName: 'Metrotown'},
      {lat: 49.1867, long: -122.8490, locName: 'SFU Surrey'},
      {lat: 49.2667, long: -123.2500, locName: 'UBC'},
      {lat: 49.1888, long: -122.8058, locName: 'Guildford Town Centre'},
      {lat: 49.1714, long: -123.1508, locName: 'Richmond Oval'},
      {lat: 49.2768, long: -122.9180, locName: 'SFU Burnaby'}
    ]

    mapMarkers.push(marker);
    this.http.put('https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/mapMarkers/',
    {"key":"mapMarkers", "data":mapMarkers}
    ).subscribe((data:any)=>{
    })
  }


  delete(pigReport:any){
    let reportName = pigReport.pid+"-"+pigReport.added_on
    let removeURL = `https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/${reportName}/`
    this.http.delete(removeURL).subscribe(()=>{
    })
  }

  edit(pigReport:any){
    let reportName = pigReport.pid+"-"+pigReport.added_on
    let removeURL = `https://272.selfip.net/apps/n8yg6woimd/collections/cmpt272/documents/${reportName}/`
    this.http.put(removeURL,{"key":reportName,"data":pigReport})
    .subscribe((data:any)=>{
    })
  }

  hashPassword(entered:any) {
    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value='+entered)
    .subscribe((data:any)=>{
      let hash = data.Digest
      console.log("check",hash=="84892b91ef3bf9d216bbc6e88d74a77c")
      if (hash == "84892b91ef3bf9d216bbc6e88d74a77c") {
        return true
      } else {
        return false
      }
    })
  }

}
