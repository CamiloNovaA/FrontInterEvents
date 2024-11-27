import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventModel } from '../../Models/Events.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  @Input() isCreate: boolean;
  @Input() isOwner: boolean;
  @Input() currentEvent: EventModel = new EventModel;
  loginForm: any;
  event!: EventModel;

  constructor(private formBuilder: FormBuilder) {
    this.isCreate = false;
    this.isOwner = false;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateEvent: ['', Validators.required],
      idCity: ['', Validators.required],
      addres: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  edit() {
    if (this.loginForm?.valid) {
      console.log('Form data:', "Inicia sesión con exito");
    }
  }

  create() {
    if (this.loginForm?.valid) {
      console.log('Form data:', "Inicia sesión con exito");
    }
  }

  validTransaction() {
    if(this.isCreate)
    {
      this.create();
    }
    else
    {
      this.edit();
    }
  }
}