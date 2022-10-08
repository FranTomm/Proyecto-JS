const appName="servicios";//identificador de la página del sitio
let section = document.getElementById("serviciosExtra");
let temp = document.querySelector("template");
let card = temp.content.querySelector("li");
fetchServicios().then(servicios=>
    renderizar(servicios,section,card)//renderizar tiene que estar dentro del 'then' porque sino se ejecuta ANTES de que se hayan cargado los servicios extra.
    )