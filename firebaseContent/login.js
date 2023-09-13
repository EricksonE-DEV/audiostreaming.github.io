import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  console.log(app)



  // Criar Conta




// Fazer Login

const entrar = document.querySelector('#entrar')
function entrarConta(){
  const lEmail = document.querySelector("#email-3b9a").value; 
  const lPassword = document.querySelector("#text-7705").value;
  signInWithEmailAndPassword(auth, lEmail, lPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(`Usuário logado: ${user.email}`);
    window.location.href = "Area-do-Cliente.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Erro ao logar: ${errorCode} - ${errorMessage}`);
  });

}

entrar.addEventListener('click',entrarConta)