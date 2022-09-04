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
let medioDePago=prompt(`El costo de su estadía será de $ ${costo}. Para confirmar su reserva solicitamos realizar un depósito del 30% del valor total de la reserva. El valor del depósito es de $ ${costo*0.3}. \n¿Cómo desea abonar?\n1-Tarjeta\n2-Transferencia.`);
alert("A continuación sera redirigido a la página para realizar su pago.")