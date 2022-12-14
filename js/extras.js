const appName="extras";//identificador de la página del sitio
/*-----------------------buscador de servicios extra-----------------------*/
//obtener string a buscar del formulario mediante eventos
const formularioBusqueda = document.querySelectorAll("form")[1];
strBusqueda = document.querySelector("#textoBuscar");

formularioBusqueda.addEventListener("submit", validarFormularioBusqueda);

function validarFormularioBusqueda(e) {
    e.preventDefault();
    const resultados=buscarServicio(extras,strBusqueda.value)
    //renderizo los resultados de busqueda en el HTML
    let section = document.getElementById("rdosBusqueda")
    let temp = document.querySelectorAll("template")[1]
    let card = temp.content.querySelector("div")
    renderizar(resultados,section,card) 
}
//función para crear un array con los servicios que cumplen el criterio de busqueda
function buscarServicio(servicios,textoABuscar){
    textoABuscar=textoABuscar.toLowerCase()
    return servicios.filter(servicio=>servicio.nombre.toLowerCase().includes(textoABuscar));       
}

/*-------------------implemento un carrito de compras------------*/
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");

function renderizarCarrito(extras) {
    // vacio todo el HTML del carrito.
    DOMcarrito.textContent = "";
    // elimino duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    //genero los nodos a partir del carrito
    carritoSinDuplicados.forEach((item) => {
            const miItem = extras.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // cuenta el numero de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            //si coincide los id? incremento el contador, en caso contrario no mantengo
            return itemId === item ? (total += 1) : total;
        }, 0);
        // creo el nodo del item del carrito
        const miNodo = document.createElement("li");
        miNodo.classList.add("list-group-item", "text-right", "mx-2");
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${mostrarPrecio(miItem[0])} `;
        //boton de borrar
        const miBoton = document.createElement("button");
        miBoton.classList.add("btn", "btn-danger", "mx-5");
        miBoton.textContent = "X";
        miBoton.style.marginLeft = "1rem";
        miBoton.dataset.item = item;
        miBoton.addEventListener("click", borrarItemCarrito);
        //mezclo nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    //verifico si el carrito esta vacio
    const miWarning = document.createElement("p");
    miWarning.innerText="El carrito está vacío.";
    !carrito.length&&DOMcarrito.appendChild(miWarning);
    //renderizo el precio total en el html
    const total=calcularTotal();
    DOMtotal.textContent = total;
    //lo renderizo tambien en la sección faturación
    DOMtotalExtras.textContent = total;
    renderizarTotal()
}

//evento para borrar un elemento del carrito
function borrarItemCarrito(evento) {
    //obtenemos el producto id que hay en el boton pulsado
    const id = evento.target.dataset.item;
    //borramos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    //alert
    Toastify({
        text: `El servicio ${extras.filter(extra=>extra.id==id)[0].nombre} fue eliminado del carrito.`,
        duration: 3000,
        style:{
          background:'linear-gradient(to right,red,#D1512D)'
        }  
    }).showToast();
    //volvemos a renderizar
    renderizarCarrito(extras);
    //actualizar el carrito en local storage
    guardarItem(carrito,'carrito');
}

//calcula el precio total teniendo en cuenta los productos repetidos

function calcularTotal() {
    //recorremos el array del carrito
    return carrito
    .reduce((total, item) => {
        // de cada elemento obtenemos su precio
        const miItem = extras.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });
        // los sumamos al total
        return total + miItem[0].valor;
    }, 0)
    .toFixed(0);
}

//vaciar el carrito
function vaciarCarrito() {
    //limpiar los productos guardados
    carrito = [];
    Toastify({
        text: "El carrito ha sido vaciado",
        duration: 3000,
        style:{
            background:'linear-gradient(to right,red,#D1512D)'
        }  
    }).showToast();
    // renderizamos los cambios
    renderizarCarrito(extras);
    //actualizar el carrito en local storage
    guardarItem(carrito,'carrito');
}

//eventos
DOMbotonVaciar.addEventListener("click", vaciarCarrito);

//inicio
fetchServicios().then(servicios=>
    renderizarCarrito(servicios)
    )