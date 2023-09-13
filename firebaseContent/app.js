import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrPWlTvHxK_-axzYDTxMF5aE_8LkLnUng",
    authDomain: "audiostreaming-47a81.firebaseapp.com",
    databaseURL: "https://audiostreaming-47a81-default-rtdb.firebaseio.com",
    projectId: "audiostreaming-47a81",
    storageBucket: "audiostreaming-47a81.appspot.com",
    messagingSenderId: "476316210694",
    appId: "1:476316210694:web:571b8d8015fa3745f11587",
    measurementId: "G-70MF6WDQQR"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para criar pasta de usuário no Firestore

async function criarPastaUsuario(uid) {
    const userRef = doc(db, "usuarios", uid);
    const nome = document.querySelector("#name-8e70").value;
    const email = document.querySelector("#email-3b9a").value;
    const senha = document.querySelector("#text-af09").value; // Adicionado # antes de text-af09

    try {
        await setDoc(userRef, {
            Nome: nome,
            Email: email,
            Senha: senha 
        });

         window.location.href = "login.html";
    } catch (error) {
        console.error(`Erro ao criar pasta para usuário: ${error}`);
    }
}

// Resto do seu código...


// Função para criar conta
const criar = document.querySelector("#criar");

function criarConta(event) {
    event.preventDefault();
    const nome = document.querySelector("#name-8e70").value;
    const email = document.querySelector("#email-3b9a").value;
    const senha = document.querySelector("#text-af09").value;
    // Registrar usuário com e-mail e senha
    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;

            // Criar pasta do usuário no Firestore
            criarPastaUsuario(user.uid);

        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao registrar. Credenciais erradas ou usuário já existente.");
        });
}

criar.addEventListener('click', criarConta);


// Criando pasta unica na coleção usuários


