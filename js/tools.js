/* Herramientas y funciones que se usan en el resto de los scripts */
/*---------------------------Desafío complementario de DOM-----------------------------*/
/* Función para renderizar las cards de servicios extra*/
function renderizar(array,section,card) {
    section.innerHTML = '<template><div class="card"><h3>Servicio nombre</h3><img src="../media/servicios/traslado_desde.jpg" alt="servicio"><p>descripción</p><p>precio</p><button class="button btn btn-primary">Añadir al carrito</button></div></template>'//esta linea borra todo lo que tenia en la sección (rdos de la búsqueda anterior por ejemplo).
    if (!array.length){
        section.innerHTML='<p>No se encontraron resultados. Por favor ingrese otro término de búsqueda.</p>'+section.innerHTML;
    }
    array.forEach((servicio)=> {
            let cardClonada = card.cloneNode(true)
            section.appendChild(cardClonada)
            //cardClonada.children nos da un "array" con los elementos html dentro del elemento card, en este caso [h3,img,p]
            // Nombre del producto
            cardClonada.children[0].innerText = servicio.nombre
            //Img
            cardClonada.children[1].src = servicio.img
            //Descripción
            cardClonada.children[2].innerText = servicio.descripcion
            // Precio
            cardClonada.children[3].innerText = mostrarPrecio(servicio)
            //Botón agregar al carrito
            cardClonada.children[4].id = "button-"+servicio.id 
            cardClonada.children[4].setAttribute("marcador", servicio.id);
            cardClonada.children[4].addEventListener("click", añadirProductoAlCarrito);
        }
    )
}

function mostrarPrecio(servicio){
    //Agrego sugar syntax para desafio de operadores avanzados
    return (servicio.tipoCosto=='variable')?
    `$${servicio.valor} por día por persona`:
    `$ ${servicio.valor}`
}

//funciones asociadas al carrito de compras
function añadirProductoAlCarrito(evento) {
    //añadir el nodo a nuestro carrito
    const id=evento.target.getAttribute("marcador");
    const servicio=extras.filter(servicio=>servicio.id==id)[0];
    if(servicio.tipoCosto=='variable'){
        Swal.fire({
            title: `Agregar servicio al carrito`,
            html: `<p>Por favor ingrese la cantidad de personas que utilizaran este servicio y el número de días que desean utilizarlo.</p>
            <label for="numPersonas" class="form-label">Número de personas:</label>
            <input type="number" id="numPersonas" class="swal2-input" placeholder="2">
            <br>
            <label for="duracion" class="form-label">Número de días:</label>
            <input type="number" id="duracion" class="swal2-input" placeholder="7">`,
            confirmButtonText: 'Confirmar',
            focusConfirm: false,
            preConfirm: () => {
              const numPersonas = Swal.getPopup().querySelector('#numPersonas').value
              const duracion = Swal.getPopup().querySelector('#duracion').value
              if (!numPersonas || !duracion) {
                Swal.showValidationMessage(`Por favor ingrese los datos solicitados.`)
              }
              return { numPersonas: numPersonas, duracion: duracion }
            }
          }).then((result) => {

            Swal.fire(`
              Cantidad de personas: ${result.value.numPersonas}
              Cantidad de días: ${result.value.duracion}
            `.trim())
            for (let i = 0; i < result.value.numPersonas*result.value.duracion; i++){
                carrito.push(id);
            }  
            //alert
            Toastify({
                text: `El servicio ${servicio.nombre} fue agregado al carrito.`,
                duration: 3000, 
            }).showToast();
            //actualizar el carrito
            appName=="extras"&&renderizarCarrito(extras);
            //guardar cambios en el local storage
            guardarItem(carrito,'carrito');
          })
    }
    else{
        carrito.push(id);
        //alert
        Toastify({
            text: `El servicio ${servicio.nombre} fue agregado al carrito.`,
            duration: 3000, 
        }).showToast();
        //actualizar el carrito
        appName=="extras"&&renderizarCarrito(extras);
        //guardar cambios en el local storage
        guardarItem(carrito,'carrito');
    }     
}

/*---------- funciones para guardar y cargar el carrito del local storage ---------*/
function guardarItem(item,key){
    //guardo una reserva/carrito en la "base de batos" simulada.
    const itemStringified=JSON.stringify(item);
    localStorage.setItem(key,itemStringified);//guardo el item en el local storage con key="key" e item itemStringified.
}

function cargarCarrito(key){
    //cargo un carrito de la "base de datos" simulada.
    const carritoCargado = JSON.parse(localStorage.getItem(key));// cargo el item con key "key" del local storage.
    //console.log(carritoCargado);//para debug
    return carritoCargado;
}

// inicialización
// al abrir la página chequeo si hay un carrito guardado en el local storage y sino abro uno
let carrito=(cargarCarrito('carrito')||[]);

/* --- Uso Fetch para conseguir la lista de servicios desde la base de datos simulada en un .json --- */
const fetchServicios = async()=>{
    const respuesta = await fetch("../json/database.json")
    return await respuesta.json()
}
let extras=[];
fetchServicios().then(servicios=>
    extras=servicios
    )//catch()...error management)