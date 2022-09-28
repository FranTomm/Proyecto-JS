/* Agrego esta sección para el desafío complementario de arrays. */
/*----------------- servicios extra------------------------------*/
const extras=[//array de objetos
    {id:1,nombre:'Traslado desde el aeropuerto',tipoCosto:'fijo',valor:2500,img:"../media/servicios/traslado_desde.jpg"},
    {id:2,nombre:'Traslado hacia el aeropuerto',tipoCosto:'fijo',valor:2500,img:"../media/servicios/traslado_hacia.jpg"},
    {id:3,nombre:'Guardería de equipaje',tipoCosto:'variable',valor:500,img:"../media/servicios/guarderia_equipaje.jpg"},
    {id:4,nombre:'Desayuno simple',tipoCosto:'variable',valor:800,img:"../media/servicios/desayuno_simple.jpg"},
    {id:5,nombre:'Desayuno continental',tipoCosto:'variable',valor:1600,img:"../media/servicios/desayuno_continental.jpg"},
    {id:6,nombre:'Lavandería',tipoCosto:'fijo',valor:1500,img:"../media/servicios/lavanderia.jpg"}
]

//supongamos para practicar lo visto de arrays que si el número de personas es mayor que 4 no puedo ofrecerles el servicio de traslado desde o hacia el aeropuerto pero sí puedo ofrecerles una excursión en combi a pampalinda con costo fijo de $1000 por persona.
if (reserva1.cantPersonas>4){
    extras.splice(0,2);
    extras.push({id:7,nombre:'Excursión en combi a Pampalinda con descuento.',tipoCosto:'fijo',valor:1000*reserva1.cantPersonas,img:"../media/servicios/Tronador.jpg"})
}

/*-----------------------buscador de servicios extra-----------------------*/
//obtener string a buscar del formulario mediante eventos
const formularioBusqueda = document.querySelectorAll("form")[1];
strBusqueda = document.querySelector("#textoBuscar");

formularioBusqueda.addEventListener("submit", validarFormularioBusqueda);

function validarFormularioBusqueda(e) {
    e.preventDefault();
    const resultados=buscarServicio(extras,strBusqueda.value)
    //pinto los resultados en el dom
    let section = document.getElementById("rdosBusqueda")
    let temp = document.querySelectorAll("template")[1]
    let card = temp.content.querySelector("div")
    renderizar(resultados,section,card) 
}

/*------------------- funciones de orden superior--------------------------- */
/* implemento un buscador de servicios */
//creo un array con los servicios que cumplen el criterio de busqueda
function buscarServicio(servicios,textoABuscar){
    textoABuscar=textoABuscar.toLowerCase()
    return servicios.filter(servicio=>servicio.nombre.toLowerCase().includes(textoABuscar));       
}

/*---------------------------Desafío complementario de DOM-----------------------------*/
//creo una función que muestre los servicios extra solicitados en pantalla a modo de carrito.
// DOM
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

/*-------------------implemento un carrito de compras------------*/
let carrito = [];
const divisa = "$";
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");

function añadirProductoAlCarrito(evento) {
    //añadir el nodo a nuestro carrito
    carrito.push(evento.target.getAttribute("marcador"));
    //actualizar el carrito
    renderizarCarrito();
}

function renderizarCarrito() {
    // vaciamos todo el html
    DOMcarrito.textContent = "";
    // quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    //generamos los nodos a partir del carrito
    carritoSinDuplicados.forEach((item) => {
        //obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          // coincide los id? solo puede existir un caso
          return itemBaseDatos.id === parseInt(item);
        });
        // cuenta el numero de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          //coincide los id? incremento el contador, en caso contrario no mantengo
          return itemId === item ? (total += 1) : total;
        }, 0);
        // creamos el nodo del item del carrito
        const miNodo = document.createElement("li");
        miNodo.classList.add("list-group-item", "text-right", "mx-2");
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa} `;
        //boton de borrar
        const miBoton = document.createElement("button");
        miBoton.classList.add("btn", "btn-danger", "mx-5");
        miBoton.textContent = "X";
        miBoton.style.marginLeft = "1rem";
        miBoton.dataset.item = item;
        miBoton.addEventListener("click", borrarItemCarrito);
        //mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    //renderizamos el precio ttotal en el html
    DOMtotal.textContent = calcularTotal();
}

//evento para borrar un elemento del carrito
function borrarItemCarrito(evento) {
    //obtenemos el producto id que hay en el boton pulsado
    const id = evento.target.dataset.item;
    //borramos los productos
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    //volvemos a renderizar
    renderizarCarrito();
}

//calcula el precio total teniendo en cuenta los productos repetidos

function calcularTotal() {
    //recorremos el array del carrito
    return carrito
    .reduce((total, item) => {
      // de cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      // los sumamos al total
      return total + miItem[0].precio;
    }, 0)
    .toFixed(2);
}

//vaciar el carrito
function vaciarCarrito() {
    //limpiar los productos guardados
    carrito = [];
    // renderizamos los cambios
    renderizarCarrito();
}

//eventos
DOMbotonVaciar.addEventListener("click", vaciarCarrito);

//inicio
renderizarProductos();
renderizarCarrito();