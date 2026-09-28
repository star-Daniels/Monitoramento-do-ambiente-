
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
 

const firebaseConfig = {
    apiKey: "AIzaSyC48TNcvYgZ5xuInjPZFgbYnlFg6OqVjoI",
    authDomain: "house-climate.firebaseapp.com",
    databaseURL: "https://house-climate-default-rtdb.firebaseio.com",
    projectId: "house-climate",
    storageBucket: "house-climate.firebasestorage.app",
    messagingSenderId: "514171179003",
    appId: "1:514171179003:web:80cfa5b0f64d0eb602455e"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Firebase inicializado!");

const ambienteRef = ref(database, "ambiente");

const botaoAr = document.getElementById("btn_ventilacao");
let estadoAtual = false


onValue(ambienteRef, (snapshot) => {
    const dados = snapshot.val();
    const temperatura = dados.temperatura
    const umidade = dados.umidade
    estadoAtual = dados.ar

    const hci =
    -8.784 +
    1.611 * temperatura +
    2.338 * umidade-
    0.1461 * temperatura * umidade;

    document.getElementById("temperatura").textContent = temperatura +"°"
    document.getElementById("umidade").textContent = umidade + "%"
    document.getElementById("hci").textContent = hci.toFixed(1);

    

    if(temperatura < 10){
        document.getElementById("temperatura_aviso").textContent = "Frio"
        document.querySelectorAll("h2, button,p").forEach(el => el.style.color = "#BABABA");

        if((Math.floor(Math.random() * 2)) == 1){
            document.body.style.backgroundImage = "url('images/casa_fria1.jpg')";

        } else{
            document.body.style.backgroundImage = "url('images/casa_fria2.jpg')";
        }

    } else if(temperatura >= 10 && temperatura <= 34){
        document.getElementById("temperatura_aviso").textContent = "Normal"
        

        document.querySelectorAll("h2, button,p").forEach(el => el.style.color = "#313131");

        if((Math.floor(Math.random() * 2)) == 1){
            document.body.style.backgroundImage = "url('images/casa_normal1.jpg')";

        } else{
            document.body.style.backgroundImage = "url('images/casa_normal2.jpg')";
        }
    } else{
        document.getElementById("temperatura_aviso").textContent = "Quente"
        document.querySelectorAll("h2, button,p").forEach(el => el.style.color = "#ffffff");
        document.body.style.backgroundImage = "url('images/casa_quente1.jpg')";
    }
    

    if (dados.ar){
        document.getElementById("ar").textContent = "ON"
        document.getElementById("btn_ventilacao").textContent = "DESLIGAR"

    } else{
        document.getElementById("ar").textContent = "OFF"
        document.getElementById("btn_ventilacao").textContent = "LIGAR"
    }

    

   

    
});

botaoAr.addEventListener("click", () => {

  

  update(ambienteRef, {
    ar: !estadoAtual
  });

});

