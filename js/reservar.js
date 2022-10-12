class Reserva{
    constructor(nombre,apellido,email,tipo,fechaEntrada,fechaSalida,cantPersonas) {
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.tipo = tipo;
        this.fechaEntrada   = fechaEntrada;
        this.fechaSalida  = fechaSalida;
        this.cantPersonas=cantPersonas;
    }
    duracion(){
        return (this.fechaSalida-this.fechaEntrada)/1000/60/60/24; //duracion de la estadía en días.
    }
    tipoAlojamiento(){
        return (this.tipo==1)?"Monoambiente":"Cabaña";
    }
    determinarTemporada(){
        const mesEntrada=this.fechaEntrada.getMonth()+1;
        const mesSalida=this.fechaSalida.getMonth()+1;
        if ((mesEntrada>2 && mesEntrada<7)||(mesEntrada>8 && mesEntrada<12)||(mesSalida>2 && mesSalida<7)||(mesSalida>8 && mesSalida<12)){//no es temporada alta
            return "baja" 
        }
        else{
            return "alta"
        }
    }
    nivelTemporada(){
        const mesEntrada=this.fechaEntrada.getMonth()+1;
        const mesSalida=this.fechaSalida.getMonth()+1;
        if ((mesEntrada>2 && mesEntrada<7)||(mesEntrada>8 && mesEntrada<12)||(mesSalida>2 && mesSalida<7)||(mesSalida>8 && mesSalida<12)){//no es temporada alta
            return 0 
        }
        else{
            return 1
        }
    }
}
//Inicializo la reserva, cargo alguna reserva anterior si existiese en el local storage
let reserva1=cargarReserva("reserva1");
let sectionIni = document.getElementById("reserva");
let tempIni = document.querySelectorAll("template");
let cardIni = tempIni[0].content.querySelector("div");
renderizarReserva(reserva1,sectionIni,cardIni)

const formulario = document.querySelector("form");
nombre = document.querySelector("#inputName");
apellido = document.querySelector("#inputSurname");
email = document.querySelector("#inputEmail");
fechaEntrada = document.querySelector("#inputFechaIngreso");
fechaSalida = document.querySelector("#inputFechaEgreso");
cantPersonas = document.querySelector("#inputNumPersonas");
monoambiente = document.querySelector("#monoambiente");
alpina = document.querySelector("#alpina");

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    let tipo =(monoambiente.checked)?1:2;
    const fechaIngreso = parseDate(fechaEntrada.value)
    const fechaEgreso = parseDate(fechaSalida.value)
    //chequeo si los datos de contacto fueron completados
    let DOMerrorMsg=document.getElementById("errorMsgContacto");
    if(!nombre.value||!apellido.value||!email.value){
        errorMsg(DOMerrorMsg,"\nPor favor, complete todos los datos de contacto.");
        return
    }
    errorMsg(DOMerrorMsg,"");
    //chequeo si la cantidad de personas no supera la cantidad máxima del alojamiento.
    DOMerrorMsg=document.getElementById("errorMsg");
    const capacidadMax=[4,6];
    if(cantPersonas.value>capacidadMax[tipo-1]||cantPersonas.value<1){
        errorMsg(DOMerrorMsg,"\nEl número de personas ingresado no es válido.");
        return
    }
    errorMsg(DOMerrorMsg,"");
    //chequeo la validez de las fechas seleccionadas.
    DOMerrorMsg=document.getElementById("errorMsgDates");
    if(!checkValidDates(fechaIngreso,fechaEgreso)){
        errorMsg(DOMerrorMsg,"\nLas fechas de entrada y/o salida ingresadas son inválidas");
        return
    }
    errorMsg(DOMerrorMsg,"");
    //Creo el objeto reserva y lo guardo en el local storage
    reserva1=new Reserva(nombre.value,apellido.value,email.value,tipo,fechaIngreso,fechaEgreso,cantPersonas.value)
    guardarItem(reserva1,"reserva1");
    //Renderizo la reserva realizada en el HTML usando DOM
    let section = document.getElementById("reserva");
    let temp = document.querySelectorAll("template");
    let card = temp[0].content.querySelector("div");
    renderizarReserva(reserva1,section,card)
}

function parseDate(string){
    //el string proveniente del formulario tiene el formato YYYY-MM-DD
    const year=parseInt(string.split("-",3)[0]);
    const month=parseInt(string.split("-",3)[1])-1;
    const day=parseInt(string.split("-",3)[2]);
    const date = new Date(year,month,day,0,0,0,0);
    return date;
}

function renderizarReserva(reserva,section,card) {
    if(reserva.length==0){
        section.innerHTML='<p>Por favor complete el formulario a la izquierda para realizar una reserva.</p><template id="templateReserva"><div><h4>Datos de contacto</h4><p>Responsable de la reserva:</p><p>email: (a esta dirección enviaremos la confirmación de tu reserva)</p><h4>Datos de la reserva:</h4><p>Tipo de alojamiento:</p><p>Número de Personas:</p><p>Fecha de Ingreso:</p><p>Fecha de Egreso:</p><p>Duración de la estadía:</p><p>Las fechas seleccionadas corresponden a temporada alta/baja.</p><p>Si los datos proporcionados no son correctos, por favor actualice la página y vuelva a rellenar el formulario.</p><h4>Facturación</h4><p>Costo estadía:</p><p>Costo fijo limpieza:</p><p>Total:</p></div></template>'
        return
    }
    section.innerHTML = '<template id="templateReserva"><div><h4>Datos de contacto</h4><p>Responsable de la reserva:</p><p>email: (a esta dirección enviaremos la confirmación de tu reserva)</p><h4>Datos de la reserva:</h4><p>Tipo de alojamiento:</p><p>Número de Personas:</p><p>Fecha de Ingreso:</p><p>Fecha de Egreso:</p><p>Duración de la estadía:</p><p>Las fechas seleccionadas corresponden a temporada alta/baja.</p><p>Si los datos proporcionados no son correctos, por favor actualice la página y vuelva a rellenar el formulario.</p><h4>Facturación</h4><p>Costo estadía:</p><p>Costo fijo limpieza:</p><p>Total:</p></div></template>'//esta linea borra todo lo que tenia en la sección (rdos de la búsqueda anterior por ejemplo).
    let cardClonada = card.cloneNode(true)
    section.appendChild(cardClonada)
    const costos=calcularCosto(reserva.tipo,reserva.duracion(),reserva.cantPersonas,reserva.nivelTemporada())
    const descuento=reserva.duracion()>7;
    cardClonada.children[1].innerText = "Responsable de la reserva: "+reserva.nombre+" "+reserva.apellido;
    cardClonada.children[2].innerText = "Email: "+reserva.email+"\nA esta dirección enviaremos la confirmación de tu reserva.";
    cardClonada.children[4].innerText = "Tipo de alojamiento: "+reserva.tipoAlojamiento();  
    cardClonada.children[5].innerText = "Número de personas: "+reserva.cantPersonas;
    cardClonada.children[6].innerText = "Fecha de ingreso: "+reserva.fechaEntrada.toLocaleDateString();
    cardClonada.children[7].innerText = "Fecha de egreso: "+reserva.fechaSalida.toLocaleDateString();
    let textoDuracion="Duración de la estadía: "+reserva.duracion()
    textoDuracion=descuento?textoDuracion+="\n¡Por haber seleccionado mas de 7 días accedes a un 20% de descuento en el costo de tu estadía!":textoDuracion;
    cardClonada.children[8].innerText = textoDuracion;
    cardClonada.children[9].innerText = "Las fechas seleccionadas corresponden a temporada "+reserva1.determinarTemporada();
    if (descuento){
        dcto=0.2;//total del descuento
        cardClonada.children[12].innerText = "Costo estadía: $"+costos[0]/(1-dcto)+" x "+reserva.duracion()+" días = $"+costos[0]/(1-dcto)*reserva.duracion()+" - $"+costos[0]*reserva.duracion()*dcto/(1-dcto)+" DESCUENTO! = $"+costos[0]*reserva.duracion();
    }
    else {
        cardClonada.children[12].innerText = "Costo estadía: $"+costos[0]+" x "+reserva.duracion()+" días = $"+costos[0]*reserva.duracion();
    }
    cardClonada.children[13].innerText = "Costo fijo de limpieza: $"+costos[1];
    cardClonada.children[14].innerText = "Total estadía: $"+costos[2];
    //actualizo el total en la sección facturación
    DOMtotalReserva.innerText=costos[2];
    renderizarTotal()
}

function calcularCosto(tipo,duracion,cantPersonas,nivelTemporada){
    const costoFijo=2000; //[$] costo fijo de limpieza
    let costoVariable=0; //[$] costo diario
    const costoTemporadaMonoambiente=[2500,3500]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    const costoTemporadaCabaña=[4500,6000]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    costoVariable=tipo==1?costoTemporadaMonoambiente[nivelTemporada]+500*(cantPersonas-1):costoTemporadaCabaña[nivelTemporada]+1000*(cantPersonas-1);
    costoVariable=duracion>7?costoVariable*0.8:costoVariable;//descuento del 20% si se quedan mas de una semana
    return [costoVariable,costoFijo,costoFijo+costoVariable*duracion];
}

/*-------------Guardo y cargo la reserva en la base de datos simulada-----------*/
//la funcion para guardar es la misma que para guardar el carrito y se llama guardarItem
//la funcion para cargar debe ser específica para la reserva.
function cargarReserva(key){
    const reservaCargada = (JSON.parse(localStorage.getItem(key))||[]);
    //los elementos tipo "date" requieren un tratamiento especial porque al usar stringify se transformaron en strings
    if (reservaCargada.length==0){
        return [];
    }
    const fechaEnt=new Date(reservaCargada.fechaEntrada);
    const fechaSal=new Date(reservaCargada.fechaSalida);
    reserva=new Reserva(reservaCargada.nombre,reservaCargada.apellido,reservaCargada.email,reservaCargada.tipo,fechaEnt,fechaSal,reservaCargada.cantPersonas);
    return reserva;
}

function errorMsg(DOMitem,msg){//defino esta funcion para poder usar el operador &&
    DOMitem.innerText=msg
}

function checkValidDates(entrada,salida){
    //chequea si las fechas de entrada y salida ingresadas son válidas
    hoy=new Date;
    hoy.setHours(0);
    hoy.setMinutes(0);
    hoy.setSeconds(0);
    hoy.setMilliseconds(0);//por si el usuario elije empezar la reserva hoy
    return (entrada>=hoy&&salida>hoy&&salida>entrada)
}