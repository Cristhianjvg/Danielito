// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private estudiantesData: any;

  constructor(private http: HttpClient) {
    // Cargar el archivo data.json al iniciar el servicio
    this.http.get('assets/data.json').subscribe((data: any) => {
      this.estudiantesData = data.estudiantes;
    });
  }

  authenticate(cedula: string, password: string): boolean {
    const estudianteAutenticado = this.estudiantesData.find(
      (estudiante: any) => estudiante.cedula === cedula && estudiante.codigo === password
    );
  
    if (estudianteAutenticado) {
      // Almacena el estudiante autenticado
      this.estudianteAutenticado = estudianteAutenticado;
      this.isAuthenticated.next(true);
    }
  
    return !!estudianteAutenticado;
  }
  // Agrega esta propiedad al servicio
private estudianteAutenticado: any;

// Agrega este método para obtener el estudiante autenticado
getEstudianteAutenticado(): any {
  console.log(this.estudianteAutenticado)
  return this.estudianteAutenticado;
}

  getAuthStatus() {
    return this.isAuthenticated.asObservable();
  }
}
