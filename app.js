function saludar(){
    let nombre=prompt("Bienvenido a la web oficial de la Posada del Chimango, cual es tu nombre?")
    alert(`hola ${nombre}, procedamos a realizar tu reserva...`)
    return nombre
}

class Fecha{
    constructor(dia,mes,año){
        this.dia=dia;
        this.mes=mes;
        this.año=año;
    }
}

class Reserva{
    constructor(tipo,fechaEntrada,fechaSalida,cantPersonas) {
        this.tipo = tipo;
        this.fechaEntrada   = fechaEntrada;
        this.fechaSalida  = fechaSalida;
        this.cantPersonas=cantPersonas;
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
    let fecha=prompt("Ingrese la fecha en la que llegará al alojamiento en formato DD/MM");//los problemas de formato de fecha se resolverán en la página final, me gustaría que la fecha se seleccione de un calendario.
    const fechaEntrada = new Fecha(parseInt(fecha.split("/",2)[0]),parseInt(fecha.split("/",2)[1]),2022);
    fecha=prompt("Ingrese la fecha en la que liberará el alojamiento en formato DD/MM");//los problemas de formato de fecha se resolverán en la página final, me gustaría que la fecha se seleccione de un calendario.
    const fechaSalida = new Fecha(parseInt(fecha.split("/",2)[0]),parseInt(fecha.split("/",2)[1]),2022);
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
    let confirmacion=prompt(`Los datos de su reserva son los siguientes:\nNombre: ${nombre}\nCantidad de personas: ${reserva.cantPersonas}\nTipo de alojamiento: ${tipoAlojamiento}\nFecha de entrada: ${reserva.fechaEntrada.dia}/${reserva.fechaEntrada.mes}/22\nFecha de salida: ${reserva.fechaSalida.dia}/${reserva.fechaSalida.mes}/22\n¿Son correctos estos datos?\n- Si\n- No`).toLowerCase();
    alert(`su respuesta fue ${confirmacion}.`)
    if (confirmacion=="si" || confirmacion=="sí"){
        return true
    }
    else{
        return false
    }
}

function chequearDisponibilidad(fecha){
    return disponibilidad
}

function determinarTemporada(fecha){
    if (fecha.mes)
    return nivelTemporada
}

function calcularCosto(tipo,duracion,cantPersonas,nivelTemporada){
    let costoFijo=2000; //[$] costo fijo de limpieza
    let costoVariable=0; //[$] costo diario
    let costoTemporadaMonoambiente=[2500,3500]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    let costoTemporadaCabaña=[4500,6000]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    if (tipo==1){//monoambiente
        costoVariable=costoTemporadaMonoambiente(nivelTemporada)+500*(cantPersonas-1);
    }
    else{//cabaña
        costoVariable=costoTemporadaCabaña(nivelTemporada)+1000*(cantPersonas-1);
    }
    if (duracion>7){
        costoVariable=costoVariable*0.8; //descuento del 20% si se quedan mas de una semana
    }
    return costoFijo+costoVariable*duracion;
}

/*----------aquí comienza la ejecucion de la página-----------*/
let confirmaReserva=false;
let nombre=saludar();
while(!confirmaReserva){
    let reserva1=consultarDatosReserva();
    confirmaReserva=confirmarDatosReserva(nombre,reserva1);
    if(confirmaReserva){
        alert("Felicitaciones, su reserva ha sido agendada.")
    }
    else{
        alert("Repitamos el proceso de reserva.")
    }
}


/*let reserva=consultarDatosReserva();
let costo=calcularCosto(reserva.tipo,reserva.duracion,)*/