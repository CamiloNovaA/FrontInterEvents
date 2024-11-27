import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../Services/events.service';
import { RegistryUser } from '../../Models/registryUser.model';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../Services/token.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm: FormGroup;
    areEquals: boolean = false;
    invalidCredential: boolean = false;


    constructor(private formBuilder: FormBuilder, 
        private tokenService: TokenService,
        private eventsService: EventsService) {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
            password: ['', Validators.required],
            passwordRepeat: ['', Validators.required]
        });
    }

    ngOnInit(): void {}

    Register(event: Event) {
        debugger
        event.preventDefault();

        if (this.registerForm.valid) {
            const registry: RegistryUser = this.registerForm.value;

            this.eventsService.registryUser(registry).subscribe({
                next: (response) => {
                    this.invalidCredential = false;
                    this.tokenService.saveToken(response.token);
                    this.tokenService.saveUser(response.idUser.toString());
                    this.tokenService.setUserName(registry.name + ' ' + registry.lastName);
                    window.location.reload();
                },
                error: () => {
                    this.invalidCredential = true
                },
            });
        }
    }

    comparisonPassword(): void {
        const password = this.registerForm.controls['password'];
        const confirmPassword = this.registerForm.controls['passwordRepeat'];
        this.areEquals = (password.value === confirmPassword.value);
    }
}