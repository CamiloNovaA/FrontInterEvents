import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../Models/Events.model';
import { SuscribeRequest } from '../../Models/SuscribeRequest.model';
import { EventDetailsComponent } from "../event-details/event-details.component";
import { EventsService } from '../../Services/events.service';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventDetailsComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit  {
  eventData: EventModel[] = [];
  currentEvent: EventModel;
  suscriptionList: number[] = [];
  suscribeRequest: SuscribeRequest = new SuscribeRequest;
  isLogged: boolean = false;
  registerSuccess: boolean = false;
  idUser: number = 0;
  isCreate: boolean = false;
  isOwner: boolean = false;

  constructor(private eventsService: EventsService,
    private tokenService: TokenService
  ) {
    this.currentEvent = new EventModel;
  }

  async ngOnInit() {
    this.getSession();
    if(this.isLogged)
      this.getEventsByUser(this.idUser);
    else
      this.getEvents();
  }

  getSession() {
    var idUser = this.tokenService.getUser();
    if(idUser > 0)
    {
      this.idUser = idUser;
      this.isLogged = true;
      this.isLogged = true;
    }
  }

  getSuscription(): void {
    this.eventsService.getAllSuscriptions(this.idUser, this.tokenService.getToken()).subscribe({
      next: (data) => {
        data.forEach( (value) => {
          this.suscriptionList.push(value.idUser);
        });
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error); // Manejo de errores
      },
    });
  }

  getEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        this.eventData = data
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error); // Manejo de errores
      },
    });
  }

  getEventsByUser(idUser: number): void {
    this.eventsService.getAllEventsById(idUser).subscribe({
      next: (data) => {
        this.eventData = data
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error); // Manejo de errores
      },
    });
  }

  suscribeForEvent(IdEvent: number): void {
    this.suscribeRequest.idEvent = IdEvent;
    this.suscribeRequest.idUser = this.idUser;

    this.eventsService.suscribeEvent(this.suscribeRequest, this.tokenService.getToken()).subscribe({
      next: (data) => {
        if(data.result)
        {
          window.alert("Te suscribiste con exitoso");
          window.location.reload();
        }
        else
          window.alert(data.message);
      },
      error: (error) => {
        window.alert(error)
      },
    });
  }

  unsuscribeForEvent(IdEvent: number): void {
    this.suscribeRequest.idEvent = IdEvent;
    this.suscribeRequest.idUser = this.idUser;

    this.eventsService.unsuscribeEvent(this.suscribeRequest, this.tokenService.getToken()).subscribe(
      response => {
        if(response.type != 0)
        {
          window.alert('Ya no participas en este evento.');
          window.location.reload();
        }
      },
      error => { 
        window.alert('Error al eliminar el evento: ' + error.error.message); 
      }
    );
  }

  deleteEvent(IdEvent: number): void {
    this.suscribeRequest.idEvent = IdEvent;
    this.suscribeRequest.idUser = this.idUser;

    this.eventsService.deleteEvent(this.suscribeRequest, this.tokenService.getToken()).subscribe(
      response => {
        if(response.type != 0)
        {
          window.alert('Se elimino el evento con exito.');
          this.eventData = this.eventData.filter(item => item.idEvent !== IdEvent);
        }
      }, 
      error => { 
        window.alert('Error al eliminar el evento: ' + error.error.message); 
      }
    );
  }

  create() {
    this.isOwner = false;
    this.isCreate = true;
  }

  edit() {
    this.isOwner = true;
    this.isCreate = false;
  }

  details(idEvent: number) {
    this.currentEvent = this.eventData.filter(x => x.idEvent === idEvent)[0] ?? new EventModel;
    this.isOwner = false;
    this.isCreate = false;
  }
}