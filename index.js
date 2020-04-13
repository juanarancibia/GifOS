//Cambio tema Dia y Noche

function sailorDay() {
  var link = document.getElementById("nigth");
  link.href = "";
  var img = document.getElementById("logo-gif");
  img.src = "./assets/gifOF_logo.png";
  sessionStorage.setItem("Night", "False");
}

function sailorNight() {
  var link = document.getElementById("nigth");
  link.href = "styles/nigth.css";
  var img = document.getElementById("logo-gif");
  img.src = "./assets/gifOF_logo_dark.png";
  sessionStorage.setItem("Night", "True");
}

//Busqueda de GIFs

function cambiarBuscar() {
  var btn = document.getElementById("btn-buscar");
  btn.className = "btn-busc btn-activo";
  var txt = document.getElementsByClassName("text-btn-busc");
  var div = document.getElementsByClassName("op-busq");
  div[0].style.display = "block";
  if (txt.length == 0) {
    return;
  } else {
    txt[0].className = "text-btn-busc-activo";
  }
}

const apiKey = "4yjldTB3j6ZOVBcQ0LUysaeTWiziStmJ";

function buscarClick() {
  var strBusqueda = document.getElementById("busqueda-gif").value;
  document.getElementById("titulo-seccion-busqueda").innerHTML =
    "Resultado de la busqueda sobre " + strBusqueda;
  const found = fetch(
    "https://api.giphy.com/v1/gifs/search?q=" +
      strBusqueda +
      "&api_key=" +
      apiKey
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => gifsBusq(data));
}

function gifsBusq(arr) {
  if (arr.data.length == 0) {
    alert("No se encontraron resultados.");
  } else {
    var div = document.getElementsByClassName("op-busq");
    div[0].style.display = "none";
    var contenedor = document.getElementById("contenedor-grid-busq");
    contenedor.innerHTML = "";
    for (i = 0; i < arr.data.length; i++) {
      var gif = arr.data[i].images.original.url;
      var titulo = arr.data[i].title.slice(0, 30);
      contenedor.innerHTML +=
        "<div class='contenedor-gif'><div class='header-gif'><span class='titulo-busqueda'>" +
        titulo +
        " </span><button class='btn-cancelar'>x</button></div><div class='contenedor-btn'><img src='" +
        gif +
        "' alt='gif-busqueda' class='gif-busqueda' />        <button onclick='verMas(this)'>Ver más...</button>      </div>   </div>";
    }
    document.getElementById("seccion-busqueda").style.display = "block";
    document.getElementsByClassName("text-btn-busc-activo").className =
      "text-btn-busc";
    document.getElementById("busqueda-gif").value = "";
    document.getElementById("btn-buscar").classList.remove("btn-activo");
    console.log(contenedor);
  }
}

function buscarTend() {
  const trending = fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey + "&limit=4"
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => gifsTend(data));
}

function gifsTend(data) {
  var imgs = document.getElementsByClassName("gif-tendencia");
  var titulos = document.getElementsByClassName("titulo-tendencia");
  for (i = 0; i < imgs.length; i++) {
    var gif = data.data[i].images.original.url;
    imgs[i].src = gif;
    var titulo = data.data[i].title;
    titulos[i].innerHTML = titulo.slice(0, 30);
  }
}

function buscarSug(arr) {
  const sugerencia = fetch(
    "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      arr.push(data);
      if (arr.length < 4) {
        buscarSug(arr);
      } else {
        gifsSug(arr);
      }
    });
}

function sugIniciador() {
  var sugerencias = [];
  buscarSug(sugerencias);
}

function gifsSug(arr) {
  var contenedor = document.getElementById("contenedor-grid-sug");
  contenedor.innerHTML = "";
  for (i = 0; i < arr.length; i++) {
    var gif = arr[i].data.images.original.url;
    var titulo = arr[i].data.title.slice(0, 30);
    contenedor.innerHTML +=
      "<div class='contenedor-gif'><div class='header-gif'><span class='titulo-sugerencia'>" +
      titulo +
      " </span><button class='btn-cancelar'>x</button></div><div class='contenedor-btn'><img src='" +
      gif +
      "' alt='gif-sugerencia' class='gif-sugerencia' />        <button onclick='verMas(this)'>Ver más...</button>      </div>   </div>";
  }
}

function similarIniciador() {
  var similares = [];
  console.log("Similar iniciado");
  buscarSimilar(similares);
}

function buscarSimilar(arr) {
  const similar = fetch(
    "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      arr.push(data);
      if (arr.length < 8) {
        buscarSimilar(arr);
      } else {
        gifsSimilares(arr);
      }
    });
}

function gifsSimilares(arr) {
  console.log(arr);
  if (arr.length == 0) {
    alert("No se encontraron resultados.");
  } else {
    var div = document.getElementsByClassName("op-busq");
    div[0].style.display = "none";
    var contenedor = document.getElementById("contenedor-grid-busq");
    contenedor.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
      var gif = arr[i].data.images.original.url;
      var titulo = arr[i].data.title.slice(0, 30);
      contenedor.innerHTML +=
        "<div class='contenedor-gif'><div class='header-gif'><span class='titulo-busqueda'>" +
        titulo +
        " </span><button class='btn-cancelar'>x</button></div><div class='contenedor-btn'><img src='" +
        gif +
        "' alt='gif-busqueda' class='gif-busqueda' />        <button onclick='verMas(this)'>Ver más...</button>      </div>   </div>";
    }
    document.getElementById("seccion-busqueda").style.display = "block";
    document.getElementsByClassName("text-btn-busc-activo").className =
      "text-btn-busc";
    document.getElementById("busqueda-gif").value = "";
    document.getElementById("btn-buscar").classList.remove("btn-activo");
  }
}

function redirCrear() {
  location.href = "misGifOS.html#creacion";
}
function redirIndex() {
  location.href = "index.html";
}

function comprobarTema() {
  var auxiliar = sessionStorage.getItem("Night");
  if (auxiliar == "True") {
    var link = document.getElementById("nigth");
    link.href = "styles/misgifos_nigth.css";
    var img = document.getElementById("logo-gif");
    img.src = "./assets/gifOF_logo_dark.png";
  }
}

function verMas(elem) {
  var titulo =
    elem.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;
  var titulotxt = titulo.split(" ");
  console.log(titulotxt[0]);
  document.getElementById("busqueda-gif").value = titulotxt[0];
  buscarClick();
  document.getElementById("busqueda-gif").value = "";
  location.href = "#busqueda";
}
