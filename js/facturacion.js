/* implemento la sección de costo total */
/*------------------sección de facturación------------------*/
//const DOMfacturacion = document.querySelector("#facturacion");
const DOMtotalReserva = document.querySelector("#totalReserva");
const DOMtotalExtras = document.querySelector("#totalServicios");
const DOMtotalFacturacion = document.querySelector("#totalCompra");
const DOMbotonComprar = document.querySelector("#boton-comprar");

DOMbotonComprar.addEventListener("click",comprar)
function comprar() {
    alert("ATENCIÓN: Serás redirigido a la página de pagos para finalizar tu reserva.")
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