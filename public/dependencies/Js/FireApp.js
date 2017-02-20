(function () {
// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCHy_xIdSxt0IAYknbnSufYHKLPlSebtD4",
	    authDomain: "mi-mascota-2017.firebaseapp.com",
	    databaseURL: "https://mi-mascota-2017.firebaseio.com",
	    storageBucket: "mi-mascota-2017.appspot.com",
	    messagingSenderId: "579979923419"
	  };

	  // Inicializa Firebase
	  firebase.initializeApp(config);
	  var db = firebase.database();
  	  var auth = firebase.auth();

  	  // Sesión form: Obtener los elementos
  	  var btnLogin = document.getElementById("btnLogin");
  	  var btnSignup = document.getElementById("btnSignup");
	  var txtEmail = document.getElementById("email");
	  var txtContraseña = document.getElementById("contraseña");

	  // Evento de Login
	  btnLogin.addEventListener("click" , function(){
	  	// Valores de los campos
	  	var email = txtEmail.value;
	  	var contraseña = txtContraseña.value;
	  	// Autentica
	  	var promesa = auth.signInWithEmailAndPassword(email, contraseña);
	  	promesa.catch(e => console.log(e.message));

	  });

	  // Evento de Signup
}());