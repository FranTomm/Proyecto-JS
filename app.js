function saludar(){
    let nombre=prompt("Bienvenido a la web oficial de la Posada del Chimango, cual es tu nombre?")
    alert(`hola ${nombre}, procedamos a realizar tu reserva...`)
    return nombre
}

class Reserva{
    constructor(tipo,fechaEntrada,fechaSalida,cantPersonas) {
        this.tipo = tipo;
        this.fechaEntrada   = fechaEntrada;
        this.fechaSalida  = fechaSalida;
        this.cantPersonas=cantPersonas;
    }
    duracion(){
        return (this.fechaSalida-this.fechaEntrada)/1000/60/60/24; //duracion de la estadía en días.
    }
}

function checkIfValid(number,rangeMin,rangeMax){//chequear si un numero ingresado está dentro de un rango
    if(number>=rangeMin && number<=rangeMax){
        return true;
    }
    else{
        return false;    
    }
}

function consultarDatosReserva(){
    let tipo=prompt("Ofrecemos dos tipos de alojamiento, un monoambiente o una cabaña alpina, ingrese el tipo de alojamiento que desea reservar:\n- 1 monoambiente\n- 2 cabaña");
    if (tipo==1){
        capacidadMax=4;
    }
    else{
        capacidadMax=6;
    }
    let cantPersonas=0;
    while(!(checkIfValid(cantPersonas,1,capacidadMax))){
        cantPersonas=prompt(`Ingrese el número de personas que necesitan alojamiento. La capacidad máxima del tipo de alojamiento elegido es ${capacidadMax}`);
        if(!checkIfValid(cantPersonas,1,capacidadMax)){
            alert("El número de personas ingresado no es válido.")
        }
    }
    let fecha=prompt("Ingrese la fecha en la que llegará al alojamiento en formato DD/MM/YY");//los problemas de formato de fecha se resolverán en la página final, me gustaría que la fecha se seleccione de un calendario.
    const fechaEntrada = new Date(parseInt(fecha.split("/",3)[2]),parseInt(fecha.split("/",3)[1])-1,parseInt(fecha.split("/",3)[0]),0,0,0,0);
    fecha=prompt("Ingrese la fecha en la que liberará el alojamiento en formato DD/MM/YY");//los problemas de formato de fecha se resolverán en la página final, me gustaría que la fecha se seleccione de un calendario.
    const fechaSalida = new Date(parseInt(fecha.split("/",3)[2]),parseInt(fecha.split("/",3)[1])-1,parseInt(fecha.split("/",3)[0]),0,0,0,0);
    const reserva1= new Reserva(tipo,fechaEntrada,fechaSalida,cantPersonas);
    return reserva1
}

function confirmarDatosReserva(nombre,reserva){
    if (reserva.tipo==1){
        tipoAlojamiento="Monoambiente"
    }
    else {
        tipoAlojamiento="Cabaña"
    }
    let confirmacion=prompt(`Los datos de su reserva son los siguientes:\nNombre: ${nombre}\nCantidad de personas: ${reserva.cantPersonas}\nTipo de alojamiento: ${tipoAlojamiento}\nFecha de entrada: ${reserva.fechaEntrada.getDate()}/${reserva.fechaEntrada.getMonth()+1}/${reserva.fechaEntrada.getYear()}\nFecha de salida: ${reserva.fechaSalida.getDate()}/${reserva.fechaSalida.getMonth()+1}/${reserva.fechaSalida.getYear()}\nDuración de la estadía: ${reserva.duracion()} días.\n¿Son correctos estos datos?\n- Si\n- No`).toLowerCase();
    //alert(`su respuesta fue ${confirmacion}.`)//para debuggear
    if (confirmacion=="si" || confirmacion=="sí"){
        return true
    }
    else{
        return false
    }
}

/*function chequearDisponibilidad(fecha){//mas adelante cuando tenga el calendario resolvere este tema.
    return disponibilidad
}*/

function determinarTemporada(fecha){
    mes=fecha.getMonth()+1;
    if ((mes>2 && mes<7)||(mes>8 && mes<12)){//no es temporada alta
        return 0 //usé numeros para determinar el nivel de temporada porque eventualmente se puede definir una temporada media y tener opciones 0, 1 y 2
    }
    else{
        return 1
    }
}

function calcularCosto(tipo,duracion,cantPersonas,nivelTemporada){
    let costoFijo=2000; //[$] costo fijo de limpieza
    let costoVariable=0; //[$] costo diario
    let costoTemporadaMonoambiente=[2500,3500]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    let costoTemporadaCabaña=[4500,6000]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    if (tipo==1){//monoambiente
        costoVariable=costoTemporadaMonoambiente[nivelTemporada]+500*(cantPersonas-1);
    }
    else{//cabaña
        costoVariable=costoTemporadaCabaña[nivelTemporada]+1000*(cantPersonas-1);
    }
    if (duracion>7){
        costoVariable=costoVariable*0.8; //descuento del 20% si se quedan mas de una semana
        alert("¡Por haber seleccionado mas de 7 días accedes a un 20% de descuento en el costo de tu estadía!")
    }
    return costoFijo+costoVariable*duracion;
}

/*----------aquí comienza la ejecucion de la página-----------*/
let confirmaReserva=false;
let nombre=saludar();
let reserva1=new Reserva(0,0,0,0);//solo lo inicializo.
while(!confirmaReserva){
    reserva1=consultarDatosReserva();
    confirmaReserva=confirmarDatosReserva(nombre,reserva1);
    if(confirmaReserva){
        alert("Felicitaciones, su reserva ha sido agendada.")
    }
    else{
        alert("Repitamos el proceso de reserva.")
    }
}
let nivelTemporada=Math.max(determinarTemporada(reserva1.fechaEntrada),determinarTemporada(reserva1.fechaSalida));
if (nivelTemporada==1){
    alert("Las fechas seleccionadas corresponden a temporada alta.");
}
else{
    alert("Las fechas seleccionadas corresponden a temporada baja.");
}
let costo=calcularCosto(reserva1.tipo,reserva1.duracion(),reserva1.cantPersonas,nivelTemporada);
alert(`El costo de su estadía será de $ ${costo}.`);

/* Agrego esta sección para el desafío complementario de arrays. */
/*----------------- servicios extra------------------------------*/
const extras=[//array de objetos
    {id:1,servicio:'Traslado desde el aeropuerto',tipoCosto:'fijo',valor:2500},
    {id:2,servicio:'Traslado hacia el aeropuerto',tipoCosto:'fijo',valor:2500},
    {id:3,servicio:'Guardería de equipaje',tipoCosto:'variable',valor:500},
    {id:4,servicio:'Desayuno simple',tipoCosto:'variable',valor:800},
    {id:5,servicio:'Desayuno continental',tipoCosto:'variable',valor:1600},
    {id:6,servicio:'Lavandería',tipoCosto:'fijo',valor:1500}
]

//supongamos para practicar lo visto de arrays que si el número de personas es mayor que 4 no puedo ofrecerles el servicio de traslado desde o hacia el aeropuerto pero sí puedo ofrecerles una excursión en combi a pampalinda con costo fijo de $1000 por persona.
if (reserva1.cantPersonas>4){
    extras.splice(0,2);
    extras.push({id:7,servicio:'Excusión en combi a Pampalinda con descuento.',tipoCosto:'fijo',valor:1000*reserva1.cantPersonas})
}

function agregarExtras(extras,duracionEstadia){
    const carrito=[];
    alert('Ofrecemos una amplia gama de servicios adicionales para hacer tu estadía más cómoda...')
    let extra=0;
    let satisfied=false;
    let duracion=0;
    let listaServicios="";
    const numExtras=extras.length;
    for(i=0;i<numExtras;i++){
        if(extras[i].tipoCosto=='variable'){
            listaServicios=listaServicios+`${i+1} - ${extras[i].servicio}   $ ${extras[i].valor} por persona por día.\n`;
        }
        else{
            listaServicios=listaServicios+`${i+1} - ${extras[i].servicio}   $ ${extras[i].valor}.\n`;
        }
    }
    listaServicios=listaServicios+`${numExtras+1} - No, gracias.`;
    while(!satisfied){
        extra=prompt(`¿Desea agregar algún servicio adicional a su estadía?\n ${listaServicios}`)
        if (extra==numExtras+1){
            satisfied=true;
        }
        else{
            item=extras[extra-1]
            if(item.id==3){
                duracion=prompt('ingrese el número de días que necesitará guardar su equipaje en la guardería.')
            }
            else{
                duracion=duracionEstadia;
            }
            if (item.tipoCosto=='variable'){
                item.duracion=duracion;
            }
            carrito.push(item)
            alert(`El servicio "${item.servicio}" fue agregado a su carrito.`)
        }
    }
    return carrito
}

function calcularCostoAdicional(carrito,numPersonas){
    let costo=0;
    let numExtras=carrito.length;
    if (numExtras>0){
        for (i=0;i<numExtras;i++){
            if(carrito[i].tipoCosto=='variable'){
                costo=costo+carrito[i].valor*carrito[i].duracion*numPersonas;
            }
            else{
                costo=costo+carrito[i].valor;//los costos fijos no se multiplican por la duracion ni por la cant de personas
            }
        }
    }
    return costo
}

/* ejecución de la parte de agregado de servicios extra */
miCarrito=agregarExtras(extras,reserva1.duracion());
costoAdicional=calcularCostoAdicional(miCarrito,reserva1.cantPersonas);
let costoTotal=costo+costoAdicional;
alert(`El costo adicional a pagar por los servicios seleccionados es de $ ${costoAdicional}.\nEl costo de la estadía sin servicios es de $ ${costo}.\nEl total a pagar es de $ ${costoTotal}.`);
let medioDePago=prompt(`Para confirmar su reserva solicitamos realizar un depósito del 30% del valor total de la reserva. El valor del depósito es de $ ${costoTotal*0.3}. \n¿Cómo desea abonar?\n1-Tarjeta\n2-Transferencia.`);
alert("A continuación sera redirigido a la página para realizar su pago.");