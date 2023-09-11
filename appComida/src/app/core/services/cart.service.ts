import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const carritoGuardado = JSON.parse(cart);
      if(carritoGuardado){
        const fechaGuardado = new Date(carritoGuardado.fecha);
        const fecha= new Date();
        const dias = 4 // dias de validez del carrito
        if(fecha.getTime() - fechaGuardado.getTime() > 1000*60*60*24*dias) {
          localStorage.removeItem("cart");
        }else{
          this.carrito = carritoGuardado.productos;
        }
      }
    }
  }

  carrito: Cart[] = [];
  agregarProducto(idProducto: number, cantidad: number, notas: string) {
    const i = this.carrito.findIndex(
      producto => producto.idProducto === idProducto
    )
    if (i === -1) {
      const nuevoProducto: Cart = {
        idProducto: idProducto,
        cantidad: cantidad,
        notas: notas
      };
      this.carrito.push(nuevoProducto);
    } else {
      this.carrito[i].cantidad += cantidad;
    }
    this.actualizarAlmacenamiento();
  }
  eliminarProducto(idProducto: number) {
    this.carrito = this.carrito.filter(
      (producto) => producto.idProducto !== idProducto
    );
    if (this.carrito.length === 0) return localStorage.clear();
    this.actualizarAlmacenamiento();
  }

  cambiarCantidadProducto(idProducto: number, cantidad: number) {
    this.carrito = this.carrito.map((producto) => {
      const productoActual = producto;
      if (producto.idProducto === idProducto) producto.cantidad = cantidad;
      return productoActual;
    });
    this.actualizarAlmacenamiento();
  }

  actualizarAlmacenamiento() {
    const fecha= new Date();
    const elementoAGuardar = {
      fecha,
      producto: this.carrito}
    localStorage.setItem('cart', JSON.stringify(elementoAGuardar));
  }
  vaciar(){
    this.carrito = [];
    localStorage.clear();
  }
}
