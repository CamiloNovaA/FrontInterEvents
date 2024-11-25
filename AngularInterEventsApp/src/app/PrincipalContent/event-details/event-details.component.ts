import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventModel } from '../../Models/Events.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  loginForm: any;
  isOwner: boolean = false;
  isCreate: boolean = false;
  event!: EventModel;

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      passwordLogin: ['', Validators.required]
    });
  }

  Edit() {
    if (this.loginForm?.valid) {
      console.log('Form data:', "Inicia sesión con exito");
    }
  }

  Delete() {
    if (this.loginForm?.valid) {
      console.log('Form data:', "Inicia sesión con exito");
    }
  }
}