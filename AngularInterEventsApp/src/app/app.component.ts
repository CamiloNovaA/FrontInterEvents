import { Component, EventEmitter, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponentComponent } from "./home-component/home-component.component";
import { HeaderComponent } from "./Common/header/header.component";
import { FooterComponent } from "./Common/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponentComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularInterEventsApp';
}
