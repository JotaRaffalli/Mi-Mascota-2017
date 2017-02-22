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
	  	// Intenta Autenticar
	  	if (!email) {
	        toastr.error('Se requiere un correo');
	        txtEmail.focus();
	        txtEmail.parentNode.classList.add('is-dirty');                        
      	} else if (!contraseña){
	        toastr.error('Se requiere una contraseña');
	        txtContraseña.focus();
	        txtContraseña.parentNode.classList.add('is-dirty');                        
      	} else {
	      	// Login
	        var promesa = auth.signInWithEmailAndPassword(email, contraseña);
	        promesa.then(function(firebaseUser) {
			  // Exito 
			  window.location = 'formulario.html';
			});
		  	promesa.catch(function(error) {
		  		//Error
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode === 'auth/wrong-password') {
			    toastr.error('Contraseña Incorrecta');
			  } else {
			    toastr.error('Error:  '+errorMessage);
			  }
			  console.log(error);

		    	});
      	}
	  });

	  // -------Evento de Logout-------
	  btnLogout.addEventListener("click" , function(){
	  	auth.signOut();
	  	toastr.success('Sesión Cerrada');

	  	
	  });

	  // -------Evento de Signup-------
	  btnSignup.addEventListener("click" , function(){
	  	// Valores de los campos
	  	var email = txtEmail.value;
	  	var contraseña = txtContraseña.value;
	  	// Verifica Campos
	  	if (!email) {
	        toastr.error('Se requiere un correo');
	        txtEmail.focus();
	        txtEmail.parentNode.classList.add('is-dirty');                        
      	} else if (!contraseña){
	        toastr.error('Se requiere una contraseña');
	        txtContraseña.focus();
	        txtContraseña.parentNode.classList.add('is-dirty');                        
      	} else {
        // Crea el usuario y asigna su correo y id


        var promesa = auth.createUserWithEmailAndPassword(email, contraseña).then(function(){
        	var user = auth.currentUser;
        	firebase.database().ref('usuario/'+user.uid).set({correo : email}).catch(function(error) {
        		alert(error.code);
        	});
        });
	  	promesa.then(function(firebaseUser) {
			  // Exito 
			  window.location = 'formulario.html';
			});
		promesa.catch(function(error) {
		  		//Error
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(error);
			  toastr.error('Error al crear usuario');
			  if(errorCode === 'auth/weak-password'){
			    alert('Contraseña debe tener mínimo 6 caracteres');
			  } else {
			    alert(errorMessage);
			  }

		    });
      	}
	  	

	  });

	  // -------Verificar estado-------
	  auth.onAuthStateChanged(function(user) {
	  if (user) {
	  	$('#btnLogout').show();
	    console.log(user);
	    console.log("Sesión Iniciada:  "+user.email);
	    //toastr.success('Sesión Iniciada');

	  } else {
	  	$('#btnLogout').hide();
	    console.log('sesion no iniciada');
	  }
	});

}());