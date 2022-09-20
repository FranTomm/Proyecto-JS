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
    if (monoambiente.checked){
        tipo=1;
    }
    else {
        tipo=2;
    }
    const fechaIngreso = parseDate(fechaEntrada.value)
    const fechaEgreso = parseDate(fechaSalida.value)
    reserva1=new Reserva(nombre.value,apellido.value,email.value,tipo,fechaIngreso,fechaEgreso,cantPersonas.value)
    //Pinto la reserva realizada en el HTML usando DOM
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
    section.innerHTML = ""//esta linea borra todo lo que tenia en la sección (rdos de la búsqueda anterior por ejemplo).
    let cardClonada = card.cloneNode(true)
    section.appendChild(cardClonada)
    const costos=calcularCosto(reserva.tipo,reserva.duracion(),reserva.cantPersonas,reserva.nivelTemporada())
    const descuento=reserva.duracion()>7;
    if (descuento){
        multiplier=1.2
    }
    //cardClonada.children nos da un "array" con los elementos html dentro del elemento card, en este caso:
    cardClonada.children[1].innerText = "Responsable de la reserva: "+reserva.nombre+" "+reserva.apellido;
    cardClonada.children[2].innerText = "Email: "+reserva.email+"\nA esta dirección enviaremos la confirmación de tu reserva.";
    cardClonada.children[4].innerText = "Tipo de alojamiento: "+reserva.tipoAlojamiento();  
    cardClonada.children[5].innerText = "Número de personas: "+reserva.cantPersonas;
    cardClonada.children[6].innerText = "Fecha de ingreso: "+reserva.fechaEntrada.toLocaleDateString();
    cardClonada.children[7].innerText = "Fecha de egreso: "+reserva.fechaSalida.toLocaleDateString();
    let textoDuracion="Duración de la estadía: "+reserva.duracion()
    if(descuento){
        textoDuracion=textoDuracion+"\n¡Por haber seleccionado mas de 7 días accedes a un 20% de descuento en el costo de tu estadía!"
    }
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
}

function calcularCosto(tipo,duracion,cantPersonas,nivelTemporada){
    const costoFijo=2000; //[$] costo fijo de limpieza
    let costoVariable=0; //[$] costo diario
    const costoTemporadaMonoambiente=[2500,3500]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    const costoTemporadaCabaña=[4500,6000]; //el costo diario se ajusta segun sea temporada alta o baja con este array
    if (tipo==1){//monoambiente
        costoVariable=costoTemporadaMonoambiente[nivelTemporada]+500*(cantPersonas-1);
    }
    else{//cabaña
        costoVariable=costoTemporadaCabaña[nivelTemporada]+1000*(cantPersonas-1);
    }
    if (duracion>7){
        costoVariable=costoVariable*0.8; //descuento del 20% si se quedan mas de una semana
    }
    return [costoVariable,costoFijo,costoFijo+costoVariable*duracion];
}