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
  	  var storage = firebase.storage();
  	  var storageRef = storage.ref();


  	  // Sesión form: Obtener los elementos
  	  var btnLogin = document.getElementById("btnLogin");
  	  var btnSignup = document.getElementById("btnSignup");
  	  var btnLogout = document.getElementById("btnLogout");
	  var txtEmail = document.getElementById("email");
	  var txtContraseña = document.getElementById("contraseña");

	  // Formulario form: Obtener los elementos
	  var txtUNombre = document.getElementById("UNombre");
  	  var txtUApellido = document.getElementById("UApellido");
  	  var txtUCedula = document.getElementById("UCedula");
	  var txtUTelefono = document.getElementById("UTelefono");
	  var txtPNombre = document.getElementById("PNombre");
	  var txtPEdad = document.getElementById("PEdad");
	  var txtPHistoria = document.getElementById("PHistoria");
	  var txtPAdopcion = document.getElementById("PAdopcion");
	  var enviarform = document.getElementById("btn-submit");

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
	  	document.location.href = 'index.html';

	  	
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
        	firebase.database().ref('usuario/'+user.uid).set({

        		correo : email

        	}).catch(function(error) {
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

	  //------Evento Enviar Formulario------

	  	if (enviarform) {
		  enviarform.addEventListener("click" , function(){
	  		
	  		var user = auth.currentUser;
	  		var UNombre = txtUNombre.value;
  	  		var UApellido = txtUApellido.value;
  	  		var UCedula = txtUCedula.value;
	  		var UTelefono = txtUTelefono.value;
	  		var PNombre = txtPNombre.value;
	  		var PEdad = txtPEdad.value;
	  		var PHistoria = txtPHistoria.value;
	  		var PAdopcion = txtPAdopcion.value;

	  		firebase.database().ref('usuario/'+user.uid).update({
	  			
	  			NombreUsuario : UNombre,
	  			ApellidoUsuario : UApellido,
	  			CedulaUsuario : UCedula,
	  			TelfUsuario : UTelefono

	  		}).catch(function(error) {
        		alert(error.code);
        	});

        	firebase.database().ref('mascota/'+UCedula).set({
	  			
	  			NombreMascota : PNombre,
	  			EdadMascota : PEdad,
	  			Historia : PHistoria,
	  			Adopcion : PAdopcion,
	  			correo : user.email 

	  		}).catch(function(error) {
        		alert(error.code);
        	});

        	//window.location = 'index.html';
	  	});
		};
	  	


	  // -------Verificar estado-------
	  auth.onAuthStateChanged(function(user) {
	  if (user) {

	  	$('#t1').show();

	  	$('#btnLogout').show();
	    console.log(user);
	    console.log("Sesión Iniciada:  "+user.email);
	    //toastr.success('Sesión Iniciada');

	  } else {
	  	$('#btnLogout').hide();
	  	$('#t1').hide();
	    console.log('sesion no iniciada');

	  }
	});

	  // -------Guarda la informacion del usuario -------
	  var user = firebase.auth().currentUser;
	  var name, correo, uid;

		if (user != null) {
		  email = user.correo;
		}

	  // -------Display del correo -------
	  function Correo () {
	  	var user = firebase.auth().currentUser;
	  	if (user != null) {
		  email = user.correo;
		  document.getElementById('correo').innerHTML = correo;;
		}
	  }

	  //------Storage------

	  var uploader = document.getElementById('uploader');
	  var fileButton = document.getElementById('fileButton');

	  fileButton.addEventListener('change', function(e) {

	  	var file = e.target.files[0];

	  	var storageRef = firebase.storage().ref('Imagenes/' + file.name);

	  	var task = storageRef.put(file);

	  	task.on('state_changed',

	  		function progress(snapshot){
	  			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  			uploader.value = percentage;
	  		},

	  		function error(err){

	  		},

	  		function complete (){

	  		}
	  	)
	  });
}());