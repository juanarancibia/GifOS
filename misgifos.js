function redirIndex() {
  location.href = "index.html";
  if (document.getElementById("nigth").src == "styles/nigth.css") {
  }
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

function sailorDay() {
  var link = document.getElementById("nigth");
  link.href = "";
  var img = document.getElementById("logo-gif");
  img.src = "./assets/gifOF_logo.png";
  sessionStorage.setItem("Night", "False");
}

function sailorNight() {
  var link = document.getElementById("nigth");
  link.href = "styles/misgifos_nigth.css";
  var img = document.getElementById("logo-gif");
  img.src = "./assets/gifOF_logo_dark.png";
  sessionStorage.setItem("Night", "True");
}

function crearGifos() {
  location.href = "#creacion";
  document.getElementById("creacion").style.display = "block";
  var btns = document.getElementsByClassName("button-nav");
  for (i = 0; btns.length > i; i++) {
    btns[i].style.display = "none";
  }
  var flecha = document.getElementsByClassName("flecha-volver");
  flecha[0].style.display = "block";
  document.getElementById("crear-pres").style.display = "none";
  document.getElementById("crear-pres").style.display = "block";
  document.getElementById("crear-captura").style.display = "none";
}

function volverAtras() {
  document.getElementById("creacion").style.display = "none";
  var btns = document.getElementsByClassName("button-nav");
  for (i = 0; btns.length > i; i++) {
    btns[i].style.display = "inline-block";
  }
  var flecha = document.getElementsByClassName("flecha-volver");
  flecha[0].style.display = "none";
  recorder.camera.stop();
  recorder.destroy();

  document.getElementById("crear-captura").style.display = "none";
}

//Captura de video

var banderaProgressBar = true;
var recorder;

function comenzar() {
  document.getElementById("crear-pres").style.display = "none";
  document.getElementById("crear-captura").style.display = "block";
  document.getElementById("video-gif").style.display = "block";
  document.getElementById("video-gif").poster = "";
  document.getElementsByClassName("btns-captura")[0].style.display = "block";
  var btns = document.getElementsByClassName("button-nav");
  for (i = 0; btns.length > i; i++) {
    btns[i].style.display = "none";
  }
  var flecha = document.getElementsByClassName("flecha-volver");
  flecha[0].style.display = "block";
  activarCamara();
}

function cancelar() {
  document.getElementById("creacion").style.display = "none";
  var btns = document.getElementsByClassName("button-nav");
  for (i = 0; btns.length > i; i++) {
    btns[i].style.display = "inline-block";
  }
  var flecha = document.getElementsByClassName("flecha-volver");
  flecha[0].style.display = "none";
  document.getElementsByClassName("subido")[0].style.display = "none";
  document.getElementById("titulo-creacion-gif").innerHTML =
    "Un chequeo antes de empezar";
}

function activarCamara() {
  var video = document.getElementById("video-gif");
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    const stream = navigator.mediaDevices
      .getUserMedia({
        video: { width: 960, height: 480 },
        audio: false,
      })
      .then(function (media) {
        video.srcObject = media;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      });
  }
}

function capturar() {
  var video = document.getElementById("video-gif");
  document.getElementById("titulo-creacion-gif").innerHTML =
    "Capturando Tu Guifo";

  capturarCamara(function (camera) {
    video.muted = true;
    video.volume = 0;
    video.srcObject = camera;
    video.onloadedmetadata = function (e) {
      video.play();
    };

    recorder = RecordRTC(camera, {
      type: "gif",
      frameInterval: 1500,
      frameRate: 30,
      quality: 30,
      width: 960,
      height: 480,
    });

    recorder.startRecording();

    recorder.camera = camera;
  });

  var btnC = document.getElementsByClassName("btns-captura");
  btnC[0].style.display = "none";
  var btnS = document.getElementsByClassName("btns-stop");
  btnS[0].style.display = "grid";
}

function terminaCaptura() {
  console.log(recorder);
  recorder.stopRecording(stopRecordingCallback);
  document.getElementById("titulo-creacion-gif").innerHTML = "Vista Previa";

  var btnS = document.getElementsByClassName("btns-stop");
  btnS[0].style.display = "none";
  var btnP = document.getElementsByClassName("btns-poscaptura");
  btnP[0].style.display = "grid";
  var aux = document.getElementById("seconds").innerHTML;
  console.log("asdfsadf" + aux);
  console.log("asdfasdfasdfas" + parseFloat(aux));
  tiempoEspera = (parseFloat(aux) * 1000) / 12;
  banderaTermino = false;
  banderaCargado = false;
  animarBarra();
}

function capturarCamara(callback) {
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { height: 480, width: 960 } })
    .then(function (camara) {
      callback(camara);
    })
    .catch(function (error) {
      alert("No fue posible capturar. Chequee console logs");
      console.error(error);
    });
}

function stopRecordingCallback() {
  var video = document.getElementById("video-gif");
  document.getElementById("descarga").href = URL.createObjectURL(
    recorder.getBlob()
  );
  video.src = video.srcObject = null;
  document.getElementsByClassName("preview-gif")[0].src = URL.createObjectURL(
    recorder.getBlob()
  );
  video.poster = URL.createObjectURL(recorder.getBlob());
  recorder.camera.stop();
}

var banderaTermino;
var k = 0;
var tiempoEspera;

function animarBarra() {
  var cargas = document.getElementsByClassName("carga-rep");
  if (!banderaTermino) {
    if (!banderaCargado) {
      cargas[k].style.background = "#F7C9F3";
      k++;
      if (k == cargas.length) {
        banderaCargado = true;
      }
      setTimeout(() => {
        animarBarra();
      }, tiempoEspera);
    } else {
      while (k > 0) {
        k--;
        cargas[k].style.background = "#999999";
      }
      banderaCargado = false;
      animarBarra();
    }
  }
}

function repetirCaptura() {
  var video = document.getElementById("video-gif");

  var btnP = document.getElementsByClassName("btns-poscaptura");
  btnP[0].style.display = "none";
  video.poster = null;
  var btnC = document.getElementsByClassName("btns-captura");
  btnC[0].style.display = "block";
  banderaTermino = true;
  activarCamara();
}

var mins = 0;
var seconds = 0;

function resetTimer() {
  mins = 0;
  seconds = 0;
  document.getElementById("mins").html = "00:";
  document.getElementById("seconds").html = "00";
}

function startTimer() {
  timex = setTimeout(() => {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      mins++;
      if (mins < 10) {
        document.getElementById("mins").innerHTML = "0" + mins + ":";
      } else document.getElementById("mins").innerHTML = mins + ":";
    }
    if (seconds < 10) {
      document.getElementById("seconds").innerHTML = "0" + seconds;
    } else {
      document.getElementById("seconds").innerHTML = seconds;
    }
    startTimer();
  }, 1000 - (new Date().getTime() % 1000) + 50);
}

function finalizarTimer() {
  document.getElementById("mins-final").innerHTML = document.getElementById(
    "mins"
  ).innerHTML;
  document.getElementById("seconds-final").innerHTML = document.getElementById(
    "seconds"
  ).innerHTML;
}

function subirGuifo() {
  banderaTermino = true;
  document.getElementsByClassName("btns-captura")[0].style.display = "none";
  document.getElementById("video-gif").style.display = "none";
  document.getElementsByClassName("en-subida")[0].style.display = "block";
  document.getElementsByClassName("btns-poscaptura")[0].style.display = "none";
  document.getElementById("titulo-creacion-gif").innerHTML =
    "Subiendo Tu Guifo";
  banderaProgressBar = true;
  estamosSubiendo();
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  uploadGiphy(form);
}

const apiKey = "4yjldTB3j6ZOVBcQ0LUysaeTWiziStmJ";
var idUltimoGif;
var banderaCancelar = false;

function uploadGiphy(form) {
  const subida = fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
    method: "POST",
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!banderaCancelar) {
        localStorage.setItem(data.data.id, data.data.id);
        idUltimoGif = data.data.id;
        banderaProgressBar = false;
        document.getElementsByClassName("en-subida")[0].style.display = "none";
        document.getElementsByClassName("subido")[0].style.display = "block";
        document.getElementById("titulo-creacion-gif").innerHTML =
          "Guifo Subido con Éxito";
        var contenedor = document.getElementsByClassName("contenedor-grid");
        contenedor[0].innerHTML = "";
        cargarMisGuifos();
      }
    });
}

function cancelarSubida() {
  banderaCancelar = true;
  document.getElementsByClassName("en-subida")[0].style.display = "none";
  document.getElementById("creacion").style.display = "none";
  var btns = document.getElementsByClassName("button-nav");
  for (i = 0; btns.length > i; i++) {
    btns[i].style.display = "inline-block";
  }
  var flecha = document.getElementsByClassName("flecha-volver");
  flecha[0].style.display = "none";
  document.getElementsByClassName("subido")[0].style.display = "none";
  console.log(banderaCancelar);
}

var j = 0;
var banderaCargado;

function estamosSubiendo() {
  var cargas = document.getElementsByClassName("carga");
  if (banderaProgressBar) {
    if (!banderaCargado) {
      cargas[j].style.background = "#F7C9F3";
      j++;
      if (j == 20) {
        banderaCargado = true;
      }
      setTimeout(() => {
        estamosSubiendo();
      }, 100);
    } else {
      j--;
      cargas[j].style.background = "#999999";
      if (j == 0) {
        banderaCargado = false;
      }
      setTimeout(() => {
        estamosSubiendo();
      }, 100);
    }
  }
}

function cargarMisGuifos() {
  var keys = Object.keys(localStorage);
  var i = 0;
  var arr = [];
  obtenerGuifo(keys, i, arr);
}

var linkUltimoGif;

function obtenerGuifo(keys, i, arr) {
  if (keys.length > i) {
    fetch("https://api.giphy.com/v1/gifs/" + keys[i] + "?api_key=" + apiKey)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (keys[i] == idUltimoGif) {
          console.log(data);
          linkUltimoGif = data.data.url;
          console.log(linkUltimoGif);
          document.getElementById("copiar-enlace").value = linkUltimoGif;
        }
        arr.push(data);
        i++;
        obtenerGuifo(keys, i, arr);
      });
  } else {
    misGuifos(arr);
    return;
  }
}

function misGuifos(arr) {
  var contenedor = document.getElementsByClassName("contenedor-grid");
  for (i = 0; i < arr.length; i++) {
    var gif = arr[i].data.images.original.url;
    var titulo = arr[i].data.title.slice(0, 30);
    contenedor[0].innerHTML +=
      "<div class='contenedor-tendencia'> <img src='" +
      gif +
      "' alt='' class='gif-tendencia' /><div class='titulo-tendencia'>" +
      titulo +
      "</div></div>";
  }
}

function copiarEnlace() {
  navigator.clipboard.writeText(linkUltimoGif).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function descargarGuifo() {
  document.getElementById("descarga").click();
  console.log("descargandooo");
}
