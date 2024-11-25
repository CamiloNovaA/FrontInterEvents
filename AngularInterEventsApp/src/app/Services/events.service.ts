import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { EventModel } from '../Models/Events.model';
import { Login } from '../Models/Login.model';
import { RegistryUser } from '../Models/registryUser.model';
import { Observable } from 'rxjs';
import { LoginResult } from '../Models/Response/LoginResult.model';
import { SuscribeRequest } from '../Models/SuscribeRequest.model';
import { SuscribeResponse } from '../Models/Response/SuscribeResponse.model';
import { SuscriptionsResult } from '../Models/Response/SuscriptionsResult.model';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private http = inject(HttpClient)

  getAllEvents() {
    return this.http.get<EventModel[]>(`${environment.urlApiEvents}/GetEvents`)
  }

  getAllEventsById(idUser: number) {
    return this.http.get<EventModel[]>(`${environment.urlApiEvents}/GetEventsById/${idUser}`)
  }

  getAllSuscriptions(idUser: number, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<SuscriptionsResult[]>(`${environment.urlApiAttendant}/GetSuscriptions/${idUser}`, { headers })
  }

  suscribeEvent(suscribeRequest: SuscribeRequest, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<SuscribeResponse>(`${environment.urlApiAttendant}/SubscribeForEvent`, suscribeRequest, { headers })
  }

  unsuscribeEvent(suscribeRequest: SuscribeRequest, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const req = new HttpRequest('DELETE', `${environment.urlApiAttendant}/UnsubscribeForEvent`, suscribeRequest, { headers });

    return this.http.request<SuscribeResponse>(req);
  }

  deleteEvent(suscribeRequest: SuscribeRequest, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const req = new HttpRequest('DELETE', `${environment.urlApiEvents}/DeleteEvent`, suscribeRequest, { headers });

    return this.http.request<SuscribeResponse>(req);
  }

  registryUser(RegistryUser: RegistryUser) {
    return this.http.post<LoginResult>(`${environment.urlApiUsers}/RegistryUser`, RegistryUser);
  }

  login(login: Login) {
    return this.http.post<LoginResult>(`${environment.urlApiUsers}/UserLogin`, login);
  }
}