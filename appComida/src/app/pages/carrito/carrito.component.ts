import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { Producto } from 'src/app/core/interfaces/productos';
import { ProductosService } from 'src/app/core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { NUMERO_WHATSAPP } from 'src/app/constantes/telefono';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule],
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);
  perfilService = inject(PerfilService);
  router = inject(Router);

  productosCarrito: Producto[] = [];
  subtotal = 0;
  delivery = 100;
  total = 0;
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set('Carrito');
    this.cartService.carrito.forEach(async (itemCarrito) => {
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.push(res);
      this.calcularInformacion();
    });
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion() {
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal +=
        this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.delivery;
  }
  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad);
    this.calcularInformacion();
  }
  async enviarMensaje() {
    let pedido = '';
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const producto = await this.productosService.getById(
        this.cartService.carrito[i].idProducto
      );
      pedido += `*${this.cartService.carrito[i].cantidad} X ${this.productosCarrito[i].nombre} 
      `;
    }
    const mensaje = `Hola, Soy ${
      this.perfilService.perfil()?.nombre
    } me gustaría hacer un pedido con los siguientes productos: 
    ${pedido}
    Si quieres comunicarte conmigo, mi número es ${
      this.perfilService.perfil()?.telefono
    }
    La dirección de entrega es ${this.perfilService.perfil()?.direccion} - ${
      this.perfilService.perfil()?.detalleEntrega
    }
    Muchas gracias`;
    // el numero al final de la url es el numero de telefono del negocio
    const link =`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURI(mensaje)}`
    window.open(link, '_blank');
    this.dialog.nativeElement.showModal();
  }

  finalizarPedido() {
    this.cartService.vaciar();
    this.dialog.nativeElement.close();
    this.router.navigate(['/']);

  }

  editarPedido() {
    this.dialog.nativeElement.close();
  }
}
