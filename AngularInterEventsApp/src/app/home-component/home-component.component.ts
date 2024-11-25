import { Component } from '@angular/core';
import { LocationsComponent } from "../PrincipalContent/locations/locations.component";
import { EventsComponent } from "../PrincipalContent/events/events.component";

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [LocationsComponent, EventsComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponentComponent {

}
