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
  	  var btnLogout = document.getElementById("btnLogout");
	  var txtEmail = document.getElementById("email");
	  var txtContraseña = document.getElementById("contraseña");

	  // Mensajes de Mi Toastr ♥
	  	toastr.options = {
		  "closeButton": false,
		  "positionClass": "toast-bottom-right",
		}


	  // -------Evento de Login-------
	  btnLogin.addEventListener("click" , function(){
	  	// Valores de los campos
	  	var email = txtEmail.value;
	  	var contraseña = txtContraseña.value;
	  	// Autentica
	  	if (!email) {
        toastr.error('Se requiere un correo');
        txtEmail.focus();
        txtEmail.parentNode.classList.add('is-dirty');                        
      	} else if (!contraseña){
        toastr.error('Se requiere una contraseña');
        txtContraseña.focus();
        txtContraseña.parentNode.classList.add('is-dirty');                        
      	} else {
        var promesa = auth.signInWithEmailAndPassword(email, contraseña);
	  	promesa.catch(e => console.log(e.message));
      	}
	  });

	  // -------Evento de Logout-------
	  btnLogout.addEventListener("click" , function(){
	  	auth.signOut();
	  	
	  });

	  // -------Evento de Signup-------
	  btnSignup.addEventListener("click" , function(){
	  	// Valores de los campos
	  	var email = txtEmail.value;
	  	var contraseña = txtContraseña.value;
	  	// Autentica
	  	if (!email) {
        toastr.error('Se requiere un correo');
        txtEmail.focus();
        txtEmail.parentNode.classList.add('is-dirty');                        
      	} else if (!contraseña){
        toastr.error('Se requiere una contraseña');
        txtContraseña.focus();
        txtContraseña.parentNode.classList.add('is-dirty');                        
      	} else {
        var promesa = auth.createUserWithEmailAndPassword(email, contraseña);
	  	promesa.catch(e => toastr.error(e.message));
      	}
	  	

	  });

	  // -------Verificar estado-------
	  auth.onAuthStateChanged(function(user) {
	  if (user) {
	  	$('#btnLogout').show();
	    console.log(user);
	    console.log("Sesión Iniciada:  "+user.email);
	    toastr.success('Sesión Iniciada');
	    window.location = 'formulario.html';

	  } else {
	  	$('#btnLogout').hide();
	    console.log('sesion no iniciada');
	  }
	});

}());