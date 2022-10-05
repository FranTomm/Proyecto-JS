/* implemento la sección de costo total */
/*------------------sección de facturación------------------*/
//const DOMfacturacion = document.querySelector("#facturacion");
const DOMtotalReserva = document.querySelector("#totalReserva");
const DOMtotalExtras = document.querySelector("#totalServicios");
const DOMtotalFacturacion = document.querySelector("#totalCompra");
const DOMbotonComprar = document.querySelector("#boton-comprar");

DOMbotonComprar.addEventListener("click",comprar)
function comprar(e) {
    e.preventDefault();
    Swal.fire({
        title: '¡Atención!',
        text: "Serás redirigido a la página de pagos para finalizar tu reserva.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir a la página de pagos',
        cancelButtonText: 'Volver'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Listo!',
            'A contiuación serás redirigido a la página de pagos.\n¡Gracias por su compra!',
            'success'
          )
        }
      })
}
function renderizarTotal(){
    const totalReserva=(parseFloat(DOMtotalReserva.innerText)>0)?parseFloat(DOMtotalReserva.innerText):0;
    const totalExtras=(parseFloat(DOMtotalExtras.innerText)>0)?parseFloat(DOMtotalExtras.innerText):0;
    DOMtotalFacturacion.innerText=totalReserva+totalExtras
}

//para inicializar renderizo la reserva
DOMtotalReserva.innerText='0';
DOMtotalExtras.innerText='0';
renderizarTotal()