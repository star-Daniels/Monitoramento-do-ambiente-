
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

    document.getElementById("temperatura").textContent = temperatura

    if(temperatura < 10){
        document.getElementById("temperatura_aviso").textContent = "Frio"
    } else if(temperatura >= 10 && temperatura <= 25){
        document.getElementById("temperatura_aviso").textContent = "Normal"
    } else{
        document.getElementById("temperatura_aviso").textContent = "Quente"
    }

    document.getElementById("umidade").textContent = umidade + "%"

    if (dados.ar){
        document.getElementById("ar").textContent = "Ligado"
        document.getElementById("btn_ventilacao").textContent = "Desligar"

    } else{
        document.getElementById("ar").textContent = "desligado"
        document.getElementById("btn_ventilacao").textContent = "Ligar"
    }

    

    document.getElementById("hci").textContent = hci.toFixed(1);

    console.log(dados);
});

botaoAr.addEventListener("click", () => {

  

  update(ambienteRef, {
    ar: !estadoAtual
  });

});

