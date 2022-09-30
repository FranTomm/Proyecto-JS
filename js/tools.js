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
//console.log(carrito) para debug

/*------------------------Base de datos de servicios extra------------------*/
/* Agrego esta sección para el desafío complementario de arrays. */
/*----------------- servicios extra------------------------------*/
const extras=[//array de objetos
    {id:1,nombre:'Traslado desde el aeropuerto',tipoCosto:'fijo',valor:2500,img:"../media/servicios/traslado_desde.jpg",descripcion:"Traslado desde el auropuerto para un máximo de 4 personas."},
    {id:2,nombre:'Traslado hacia el aeropuerto',tipoCosto:'fijo',valor:2500,img:"../media/servicios/traslado_hacia.jpg",descripcion:"Traslado hacia el auropuerto para un máximo de 4 personas."},
    {id:3,nombre:'Lavandería',tipoCosto:'fijo',valor:1500,img:"../media/servicios/lavanderia.jpg",descripcion:"Lavado de ropa hasta 5kg."},
    {id:4,nombre:'Desayuno simple',tipoCosto:'variable',valor:800,img:"../media/servicios/desayuno_simple.jpg",descripcion:"Un desayuno simple para 1 persona. Se entrega en el alojamiento a partir de las 8hs."},
    {id:5,nombre:'Desayuno continental',tipoCosto:'variable',valor:1600,img:"../media/servicios/desayuno_continental.jpg",descripcion:"Un desayuno continental para 1 persona. Se entrega en el alojamiento a partir de las 8hs."},
    {id:6,nombre:'Excursión en combi a Pampalinda',tipoCosto:'variable',valor:1000,img:"../media/servicios/Tronador.jpg",descripcion:"Traslado en combi ida y vuelta desde Bariloche hasta Pampalinda."},
    {id:7,nombre:'Alquiler de mountainbike',tipoCosto:'variable',valor:3000,img:"../media/servicios/mountainbike.jpg",descripcion:"Alquiler diario de una bicicleta tipo mountain bike."},
    {id:8,nombre:'Alquiler de kayak',tipoCosto:'variable',valor:3000,img:"../media/servicios/kayak2.jpg",descripcion:"Alquiler diario de equipo de Kayak tipo sit-on-top para una persona."},
    {id:9,nombre:'Alquiler de equipo de esquí',tipoCosto:'variable',valor:4000,img:"../media/servicios/esqui.jpg",descripcion:"Alquiler diario de equipo de esquí para una persona."},
    {id:10,nombre:'Alquiler de equipo de snowboard',tipoCosto:'variable',valor:4000,img:"../media/servicios/snowboard.jpg",descripcion:"Alquiler diario de equipo de snowboard para un persona."},
    {id:11,nombre:'Alquiler de ropa para nieve',tipoCosto:'variable',valor:2000,img:"../media/servicios/ropanieve.jpg",descripcion:"Alquiler diario de ropa para nieve para una persona."},
    {id:12,nombre:'Alquiler de raquetas para nieve',tipoCosto:'variable',valor:1500,img:"../media/servicios/raquetas.jpeg",descripcion:"Alquiler de raquetas para travesía sobre nieve para una persona."}
]