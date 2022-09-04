function saludar(){
    let nombre=prompt("Bienvenido a la web oficial de la Posada del Chimango, cual es tu nombre?")
    alert(`hola ${nombre}, procedamos a realizar tu reserva...`)
    return nombre
}

/*
class reserva(){
    constructor()
    reserva.fecha;
}*/

function checkIfValid(number,rangeMin,rangeMax){//chequear si un numero ingresado está dentro de un rango
    if(number>=rangeMin && number<=rangeMax){
        return true;
    }
    else{
        return false;
    }
}

function consultarDatosReserva(){
    reserva.tipo=prompt("Ofrecemos dos tipo de alojamiento, un monoambiente o una cabaña alpina, ingrese el tipo de alojamiento que desea reservar:\n- 1 monoambiente\n- 2 cabaña");
    
    reserva.cantPersonas=prompt(`Ingrese el número de personas que necesitan alojamiento. La capacidad máxima del tipo de alojamiento elegido es ${capacidadMax}`);
    return datosReserva
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

let nombre=saludar();
/*let reserva=consultarDatosReserva();
let costo=calcularCosto(reserva.tipo,reserva.duracion,)*/