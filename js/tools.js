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
    carrito.push(evento.target.getAttribute("marcador"));
    //actualizar el carrito
    renderizarCarrito();
}