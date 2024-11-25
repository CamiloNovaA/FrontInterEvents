import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginComponent } from "../../Authentication/login/login.component";
import { RegisterComponent } from "../../Authentication/register/register.component";
import { LoginResult } from '../../Models/Response/LoginResult.model';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() userSession = new EventEmitter<string>();
  fullName: string = "";
  isLogin: boolean = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.getSession();
  }

  actualizarHeader(mensaje: LoginResult)
  {
    console.log(mensaje);
  }

  getSession() {
    var x = this.tokenService.getUser();
    if(x > 0)
    {
      this.isLogin = true;
      this.fullName = localStorage.getItem("FullName")?.toString() || "";
      this.userSession.emit(x.toString());
    }
  }

  LogOut() {
    this.tokenService.signOut();
    this.isLogin = false;
    this.fullName = "";
    window.location.reload();
  }
}
