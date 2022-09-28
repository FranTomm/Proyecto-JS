/*Creo la lista de servicios extra de forma que no quede hardcodeada*/

//base de datos:
const extras=[//array de objetos
    {id:1,nombre:'Traslado desde el aeropuerto',tipoCosto:'fijo',valor:2500,img:"../media/servicios/traslado_desde.jpg"},
    {id:2,nombre:'Traslado hacia el aeropuerto',tipoCosto:'fijo',valor:2500,img:"../media/servicios/traslado_hacia.jpg"},
    {id:3,nombre:'Guardería de equipaje',tipoCosto:'variable',valor:500,img:"../media/servicios/guarderia_equipaje.jpg"},
    {id:4,nombre:'Desayuno simple',tipoCosto:'variable',valor:800,img:"../media/servicios/desayuno_simple.jpg"},
    {id:5,nombre:'Desayuno continental',tipoCosto:'variable',valor:1600,img:"../media/servicios/desayuno_continental.jpg"},
    {id:6,nombre:'Lavandería',tipoCosto:'fijo',valor:1500,img:"../media/servicios/lavanderia.jpg"},
    {id:7,nombre:'Excursión en combi a Pampalinda con descuento.',tipoCosto:'fijo',valor:1000*6,img:"../media/servicios/Tronador.jpg"}
]

//habrá alguna forma de importar funciones de otro script?
//en este caso me gustaría acceder a la función "renderizar" del script app.js sin ejecutar todo el script.
//quizas hay alguna forma de crear tu propia librería de funciones para usar e importar eso solo. Consultar en clase.
//por ahora lo que hice fue copiar y pegar la función que necesito de app.js en este script.

function renderizar(array) {
    section.innerHTML = ""//esta linea borra todo lo que tenia en la sección (rdos de la búsqueda anterior por ejemplo).

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