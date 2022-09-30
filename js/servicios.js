function renderizar(array) {
    section.innerHTML = '<template><li class="card"><h3>Servicio nombre</h3><img src="../media/servicios/traslado_desde.jpg" alt="servicio"><p>precio</p><button class="button btn btn-primary">Añadir al carrito</button></li></template>'//esta linea borra todo lo que tenia en la sección (rdos de la búsqueda anterior por ejemplo).

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
    //Agrego sugar syntax para desafio de operadores avanzados
    return (servicio.tipoCosto=='variable')?
    `$${servicio.valor} por día por persona`:
    `$ ${servicio.valor}`
}

let section = document.getElementById("serviciosExtra")
let temp = document.querySelector("template")
let card = temp.content.querySelector("li")
renderizar(extras)