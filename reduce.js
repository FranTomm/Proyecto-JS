const productos = [
    { nombre: "Mouse", precio: 500 },
    { nombre: "webCam", precio: 1000 },
    { nombre: "impresora", precio: 1500 },
  ];

  let res = productos.reduce((accum, p)=>{
    return accum + p.precio
  },100)

  console.log(res)