import { CommonModule } from '@angular/common';
import { Component, inject, isStandalone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Perfil } from 'src/app/core/interfaces/perfil';
import { HeaderService } from 'src/app/core/services/header.service';
import { PerfilService } from 'src/app/core/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PerfilComponent {
  headerService = inject(HeaderService);
  perfilService = inject(PerfilService)


  ngOnInit(): void {
    this.headerService.titulo.set("Perfil");
    if(this.perfilService.perfil()){
      this.perfil = {...this.perfilService.perfil()!}
    }
  }

  perfil:Perfil = {
    nombre:"",
    direccion:"",
    telefono:"",
    detalleEntrega: ""
  }

  guardarDatosPerfil(){
    this.perfilService.guardarDatos(this.perfil);
  }

}
