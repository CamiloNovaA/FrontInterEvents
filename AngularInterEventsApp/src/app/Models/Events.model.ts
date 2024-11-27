export class EventModel {
    idEvent: number;
    idEventSuscription: number;
    name: string;
    description: string;
    dateEvent: Date;
    idcity: string;
    nameCity: string;
    longitude: string;
    latitude: string;
    address: string;
    owner: number;
    capacity: number;
    active: boolean;
    creationDate: Date;

    constructor() {
        this.idEvent = 0;
        this.idEventSuscription = 0;
        this.name = "";
        this.description = "";
        this.dateEvent = new Date;
        this.idcity = "";
        this.nameCity = "";
        this.longitude = "";
        this.latitude = "";
        this.address = "";
        this.owner = 0;
        this.capacity = 0;
        this.active = true;
        this.creationDate = new Date
    }
}