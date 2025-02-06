import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HabitacionesService {
  private apiUrl = 'http://192.168.1.102/HTLES/AAJHoteles/apisHoteles';

  constructor(private http: HttpClient) {}

  obtenerHabitaciones(filtros: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buscarHabitaciones.php`, filtros);
  }
}
