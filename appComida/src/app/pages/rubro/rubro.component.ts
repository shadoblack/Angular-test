import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/productos';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from 'src/app/core/services/productos.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss']
})
export class RubroComponent {
  headerService = inject(HeaderService)
  productosService = inject(ProductosService)
  ac = inject(ActivatedRoute)
  productos:Producto[] = []


  ngOnInit(): void {
    this.headerService.titulo.set("Rubro")
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.productosService.getByCategoria(parseInt(params['id'])).then(productos =>this.productos = productos)

      }
    })
  }

}
