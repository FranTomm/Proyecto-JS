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
        if (this.tipo==1){
            return "Monoambiente"
        }
        else{
            return "Cabaña"
        }
    }
}

let reserva1=new Reserva(0,0,0,0,0,0,0);//solo lo inicializo.

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
    if (monoambiente.value==true){
        tipo=1;
    }
    else {
        tipo=2;
    }
    const fechaIngreso = parseDate(fechaEntrada.value)
    const fechaEgreso=parseDate(fechaSalida.value)
    reserva1=new Reserva(nombre.value,apellido.value,email.value,tipo,fechaIngreso,fechaEgreso,cantPersonas.value)
    confirmarDatosReserva(reserva1)
}

function parseDate(string){
    //el string proveniente del formulario tiene el formato YYYY-MM-DD
    const year=parseInt(string.split("-",3)[0]);
    const month=parseInt(string.split("-",3)[1])-1;
    const day=parseInt(string.split("-",3)[2]);
    const date = new Date(year,month,day,0,0,0,0);
    return date;
}

function confirmarDatosReserva(reserva){
//    let confirmacion=prompt(`Los datos de su reserva son los siguientes:\nNombre: ${reserva.nombre}\nApellido: ${reserva.apellido}\nemail: ${reserva.email}\nCantidad de personas: ${reserva.cantPersonas}\nTipo de alojamiento: ${reserva.tipo}\nFecha de entrada: ${reserva.fechaEntrada.getDate()}/${reserva.fechaEntrada.getMonth()+1}/${reserva.fechaEntrada.getYear()}\nFecha de salida: ${reserva.fechaSalida.getDate()}/${reserva.fechaSalida.getMonth()+1}/${reserva.fechaSalida.getYear()}\nDuración de la estadía: ${reserva.duracion()} días.\n¿Son correctos estos datos?\n- Si\n- No`).toLowerCase();
    let confirmacion=prompt(`Los datos de su reserva son los siguientes:\nNombre: ${reserva.nombre}\nApellido: ${reserva.apellido}\nemail: ${reserva.email}\nCantidad de personas: ${reserva.cantPersonas}\nTipo de alojamiento: ${reserva.tipoAlojamiento()}\nFecha de entrada: ${reserva.fechaEntrada.toLocaleDateString('en-GB')}\nFecha de salida: ${reserva.fechaSalida.toLocaleDateString('en-GB')}\nDuración de la estadía: ${reserva.duracion()} días.\n¿Son correctos estos datos?\n- Si\n- No`).toLowerCase();
    //alert(`su respuesta fue ${confirmacion}.`)//para debuggear
    return (confirmacion=="si" || confirmacion=="sí")
}