import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios: any[] = [];
  hotelId: number | null = null;
  calificacion: number = 5;
  comentario: string = '';

  constructor(
    private comentarioService: ComentariosService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro hotelId de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('hotelId');
      if (id) {
        this.hotelId = Number(id);  // Convertir el id a número
        this.cargarComentarios();
      }
    });
  }

  cargarComentarios() {
    if (this.hotelId) {
      this.comentarioService.getComentarios(this.hotelId).subscribe(
        (data: any) => {
          if (data.status === 'success') {
            this.comentarios = data.data;
          }
        },
        error => {
          console.error('Error al cargar comentarios', error);
        }
      );
    }
  }

}
