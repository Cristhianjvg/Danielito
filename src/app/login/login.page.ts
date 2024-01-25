// login.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cedula: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit() {
  }

  redirectToHome() {
    // Utiliza el servicio de autenticación
    const isAuthenticated = this.authService.authenticate(this.cedula, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/tab-principal']);
    } else {
      // Manejar lógica para credenciales inválidas (puedes mostrar un mensaje de error, etc.)
      console.log('Credenciales inválidas');
    }
  }
}
