import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { Producto } from 'src/app/core/interfaces/productos';
import { ProductosService } from 'src/app/core/services/productos.service';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.scss'],
    standalone: true,
    imports: [CommonModule, ContadorCantidadComponent]
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService)

  productosCarrito:Producto[]=[];

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito');
    this.cartService.carrito.forEach( async itemCarrito =>{
     const res = await this.productosService.getById(itemCarrito.idProducto)
     if(res) this.productosCarrito.push(res);
    })
    
  }

  eliminarProducto(idProducto:number){
    this.cartService.eliminarProducto(idProducto);
  }
}
