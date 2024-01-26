import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  estudiantes: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadJsonData()
  }

  loadJsonData() {
    // Obtiene el estudiante autenticado desde el servicio
    const estudianteAutenticado = this.authService.getEstudianteAutenticado();
  
    if (estudianteAutenticado) {
      // Muestra solo el estudiante autenticado
      this.estudiantes = [estudianteAutenticado];
      console.log(this.estudiantes);
    }
  }


}
