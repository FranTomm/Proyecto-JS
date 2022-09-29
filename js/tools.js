/* Herramientas y funciones que se usan en el resto de los scripts */
/*---------------------------Desafío complementario de DOM-----------------------------*/
/* Función para renderizar las cards de servicios extra*/
function renderizar(array,section,card) {
    section.innerHTML = '<template>    <div class="card">        <h3>Servicio nombre</h3>        <img src="../media/servicios/traslado_desde.jpg" alt="servicio">        <p>precio</p>        <button class="button btn btn-primary">Añadir al carrito</button>    </div></template>'//esta linea borra todo lo que tenia en la sección (rdos de la búsqueda anterior por ejemplo).

    array.forEach((servicio)=> {
            let cardClonada = card.cloneNode(true)
            section.appendChild(cardClonada)
            //cardClonada.children nos da un "array" con los elementos html dentro del elemento card, en este caso [h3,img,p]
            // Nombre del producto
            cardClonada.children[0].innerText = servicio.nombre
            //Img
            cardClonada.children[1].src = servicio.img
            // Precio
            cardClonada.children[2].innerText = mostrarPrecio(servicio)
            //Botón agregar al carrito
            cardClonada.children[3].id = "button-"+servicio.id 
            cardClonada.children[3].setAttribute("marcador", servicio.id);
            cardClonada.children[3].addEventListener("click", añadirProductoAlCarrito);
        }
    )
}

function mostrarPrecio(servicio){
    if (servicio.tipoCosto=='variable'){
        return `$ ${servicio.valor} por día por persona`
    }
    else{
        return `$ ${servicio.valor}`
    }
}

//funciones asociadas al carrito de compras
function añadirProductoAlCarrito(evento) {
    //añadir el nodo a nuestro carrito
    servicio=extras.filter(servicio=>servicio.id==evento.target.getAttribute("marcador"));
    //console.log(servicio)//para debuggear
    let cantidad=1;
    if(servicio.tipoCosto=='variable'){
        cantidad=prompt(`Ingrese el numero de días.`)
    }
    for (let i = 0; i < cantidad; i++){
        carrito.push(evento.target.getAttribute("marcador"));
    }  
    //actualizar el carrito
    renderizarCarrito();
}

/*---------- funciones para guardar y cargar el carrito del local storage ---------*/
function guardarItem(item,key){
    //guardo una reserva/carrito en la "base de batos" simulada.
    const itemStringified=JSON.stringify(item);
    //console.log(reservaStringified);//para debuggear
    localStorage.setItem(key,itemStringified);//guardo el item en el local storage con key="key" e item itemStringified.
}

function cargarCarrito(key){
    //cargo un carrito de la "base de datos" simulada.
    const carritoCargado = JSON.parse(localStorage.getItem(key));// cargo el item con key "key" del local storage.
    //console.log(carritoCargado);//para debug
    return carrito;
}

// al abrir la página chequeo si hay un carrito guardado en el local storage y sino abro uno
let carrito=[];
guardarItem(carrito,'carrito')
carrito=cargarCarrito('carrito')
console.log(carrito)

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