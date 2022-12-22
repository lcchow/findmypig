export class PigReport {
    added_on: string;
    pid: number;
    name: string;
    phoneNo: number;
    breed: string;
    location_name: string;
    longitude: number;
    latitude: number;
    extra_notes: string;
    status: string;

    constructor (add:string, pid:number, name:string, phN:number,breed:string,
                locName:string,long:number,lat:number,en:string,st:string) {
        this.added_on = add;
        this.pid = pid;
        this.name = name;
        this.phoneNo = phN;
        this.breed = breed;
        this.location_name = locName;
        this.longitude = long;
        this.latitude = lat;
        this.extra_notes = en;
        this.status = st;
    }

}
