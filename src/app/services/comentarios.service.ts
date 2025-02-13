import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private apiUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  agregarComentario(hotel_id: number, calificacion: number, comentario: string): Observable<any> {
    const token = this.authService.getToken();
    console.log("Token enviado en agregarComentario:", token);

    if (!token) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.authService.obtenerUsuarioLogueado(token).pipe(
      switchMap((usuario) => {
        console.log("Usuario recibido:", usuario);
        if (!usuario || !usuario.id) {
          return throwError(() => new Error('ID de usuario no disponible'));
        }

        const usuarioId = usuario.id;
        const body = {
          hotel_id,
          calificacion,
          comentario,
          usuario_id: usuarioId,
        };

        return this.http.post(`${this.apiUrl}/comentReserva.php`, body);
      })
    );
  }

  getComentarios(hotel_id: number): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.apiUrl}/comentarios.php?hotel_id=${hotel_id}`, { headers });
  }

  getReservaciones(hotel_id?: number): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let url = `${this.apiUrl}/reservaciones.php`;
    if (hotel_id) {
      url += `?hotel_id=${hotel_id}`;
    }

    return this.http.get(url, { headers });
  }
}
