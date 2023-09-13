import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";



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

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);


 const userDataForm = document.getElementById("userDataForm");

userDataForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const tel = document.getElementById("tel").value;
    const emp = document.getElementById("emp").value;
    const rua = document.getElementById("rua").value;
    const cdd = document.getElementById("cdd").value;
    const cep = document.getElementById("cep").value;
    const pais = document.getElementById("pais").value;
    const plano = document.getElementById("plano").value;
    const user = getAuth().currentUser;
    const uid = user.uid;

    const userRef = doc(db, "usuarios", uid); 

    updateDoc(userRef, {
        Tel: tel,
        Empresa: emp,
        Rua: rua, 
        Cidade: cdd, 
        Cep: cep, 
        Pais: pais,
        Plano: plano 
    })
    .then(() => {
        alert("Dados definidos com sucesso!");
    })
    .catch((error) => {
        console.log(`Erro ao definir dados do usuário: ${error}`);
    });
});



  function mostrarDadosUsuario(doc) {
    const campos = [
        { id: 'sNome', label: 'Nome', campo: 'Nome' },
        { id: 'sEmail', label: 'Email', campo: 'Email' },
        { id: 'sPassword', label: 'Senha', campo: 'Senha' },
        { id: 'sPhone', label: 'Telefone', campo: 'Tel' },
        { id: 'sRua', label: 'Rua', campo: 'Rua' },
        { id: 'sCdd', label: 'Cidade', campo: 'Cidade' },
        { id: 'sCep', label: 'CEP', campo: 'Cep' },
        { id: 'sPais', label: 'Pais', campo: 'Pais' },
        { id: 'sEmp', label: 'Empresa', campo: 'Empresa' },
        { id: 'plano', label: 'Plano', campo: 'Plano' }
    ];

    campos.forEach(campo => {
        const elemento = document.querySelector(`#${campo.id}`);
        if (doc.data()[campo.campo]) {
            elemento.innerHTML = `${campo.label}: ${doc.data()[campo.campo]}`;
        }
    });
}

function verificarUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userRef = doc(db, "usuarios", user.uid);
            verificarPlano();
            getDoc(userRef).then((doc) => {
                if (doc.exists()) {
                    mostrarDadosUsuario(doc);

                    if (!doc.data().Nome || !doc.data().Email || !doc.data().Senha || !doc.data().Tel || !doc.data().Rua || !doc.data().Cidade || !doc.data().Cep || !doc.data().Pais) {
                        const alert = document.querySelector('#noCompleteData').style.display = 'block';
                    } else {
                        const alert = document.querySelector('#noCompleteData').style.display = 'none';
                    }
                } else {
                    
                }
            }).catch((error) => {
                
            });
        } else {
            window.location.href = "login.html";
        }
    });
}


  verificarUser();

//logout

const logoutButton = document.getElementById("logout");

function fazerLogout() {
 signOut(auth)
    .then(() => {
     alert("Usuário deslogado com sucesso.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(`Erro ao fazer logout, tente novamente mais tarde.`);
    });
}

 logoutButton.addEventListener("click", fazerLogout);

// Planos


// Suponha que você tenha uma variável que indica o plano do cliente (por exemplo, 'basico', 'intermediario', 'avancado')
function verificarPlano(){
  const user = getAuth().currentUser;

  if (user) {
    const uid = user.uid;
    const userRef = doc(db, "usuarios", uid);
    const plan1 = document.querySelector('#plan-1');
    const plan2 = document.querySelector('#plan-2');
    const plan3 = document.querySelector('#plan-3');

    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        const planoCliente = doc.data().Plano;

        if (planoCliente === 'basico') {
          plan3.style.display = "none";
          plan2.style.display = "none";
        } else if (planoCliente === 'intermediario') {
          plan3.style.display = "none";
          plan1.style.display = "none";
        } else if (planoCliente === 'avancado') {
          plan1.style.display = "none";
          plan2.style.display = "none";
        } else {
          alert("Por favor, vá na aba 'Editar', logo em seguida, adicione seus dados e selecione seu plano. ");
        }
      } else {
        alert("Erro no servidor.");
      }
    }).catch((error) => {
    });
  } else {
    alert("Usuário não está autenticado");
  }
}

