import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MateriasPage } from '../materias/materias.page';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  estudiantes: any[] | undefined;
  materias: string[] = [];
  isAuthenticated: boolean = false;

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Suscribe al estado de autenticación
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
      // Asigna las materias al estudiante autenticado
      this.materias = this.extractMaterias([estudianteAutenticado]);
    }
  }

  extractMaterias(estudiantes: any[]): string[] {
    // Lógica para extraer las materias de los estudiantes
    // Puedes implementar esto según tu estructura de datos
    const materias: string[] = [];
    for (const estudiante of estudiantes) {
      if (estudiante.materias) {
        materias.push(...estudiante.materias);
      }
    }
    // Elimina duplicados usando un conjunto
    return Array.from(new Set(materias));
  }

  getIconoPorTipo(tipo: string): string {
    // Lógica para asignar íconos según el tipo (cedula, ano, codigo, etc.)
    const iconosPorTipo: { [tipo: string]: string } = {
      cedula: 'nombre_icono_cedula',
      ano: 'nombre_icono_ano',
      codigo: 'nombre_icono_codigo',
      especialidad: 'nombre_icono_especialidad',
      // ... más asignaciones de íconos según sea necesario
    };

    return iconosPorTipo[tipo] || 'default_icon_name';
  }
  getIconoColor(caracteristica: string): string {
    // Lógica para asignar colores según la característica
    // Puedes implementar esto según tus necesidades
    const coloresPorCaracteristica: { [caracteristica: string]: string } = {
      nombre: 'danger',
      cedula: 'tertiary',
      ano: 'success',
      codigo: 'warning',
      especialidad: 'medium',
      // ... más asignaciones de colores
    };

    return coloresPorCaracteristica[caracteristica] || 'medium'; // Valor por defecto
  }
  getIconoNombre(caracteristica: string): string {
    // Lógica para asignar nombres de íconos según la característica
    // Puedes implementar esto según tus necesidades
    const iconosPorCaracteristica: { [caracteristica: string]: string } = {
      nombre: 'person-circle-outline',
      cedula: 'card-outline',
      ano: 'school-outline',
      codigo: 'id-card-outline',
      especialidad: 'git-branch-outline',
      // ... más asignaciones de nombres de íconos
    };

    return iconosPorCaracteristica[caracteristica] || 'git-branch-outline'; // Valor por defecto
  }

}
