import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  estudiantes: any[] | undefined;
  materia:any;
  isAuthenticated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute ,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.materia = this.activatedRoute.snapshot.paramMap.get("materia")
    console.log("materia",this.materia)

    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;

      if (this.isAuthenticated) {
        // Si está autenticado, carga los datos del estudiante
        this.loadJsonData();
      }
    });
  }

  loadJsonData() {
    // Obtiene el estudiante autenticado desde el servicio
    const estudianteAutenticado = this.authService.getEstudianteAutenticado();
  
    if (estudianteAutenticado) {
      // Muestra solo el estudiante autenticado
      this.estudiantes = [estudianteAutenticado];
      console.log(this.estudiantes);
      
      // Asigna las materias al estudiante autenticado
      //this.materias = this.extractMaterias([estudianteAutenticado]);
    }
  }

}

