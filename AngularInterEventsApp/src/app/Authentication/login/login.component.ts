import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../Services/events.service';
import { Login } from '../../Models/Login.model';
import { CommonModule } from '@angular/common';
import { LoginResult } from '../../Models/Response/LoginResult.model';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: any;
  invalidCredential: boolean = false;
  @Output() userDetails = new EventEmitter<LoginResult>();

  constructor(private formBuilder: FormBuilder, 
    private eventsService: EventsService, 
    private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', Validators.required]
    });
  }

  Login() {
    if (this.loginForm?.valid) {
      const credenciales: Login = this.loginForm.value;

      this.eventsService.login(credenciales).subscribe({
        next: (response) => {
          this.invalidCredential = false;
          this.tokenService.saveToken(response.token);
          this.tokenService.saveUser(response.idUser.toString());
          this.tokenService.setUserName(response.fullName);
          window.location.reload();
        },
        error: () => {
          this.invalidCredential = true
        },
      });
    }
  }
}