export interface EventModel {
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
}