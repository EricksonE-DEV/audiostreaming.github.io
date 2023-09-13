const criar = document.querySelector("#criar")
function criarConta(){
  const email = document.querySelector("#email-3b9a").value; // Corrigi aqui
  const password = document.querySelector("#text-af09").value; // Corrigi aqui
  createUserWithEmailAndPassword(auth, email, password) // Usando a função corretamente
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(`Usuário registrado: ${user.email}`);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
      alert("Erro ao registrar. Credênciais erradas ou usuário ja existente.")
    
    
  });

}