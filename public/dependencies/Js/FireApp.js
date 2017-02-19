(function () {
// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCHy_xIdSxt0IAYknbnSufYHKLPlSebtD4",
	    authDomain: "mi-mascota-2017.firebaseapp.com",
	    databaseURL: "https://mi-mascota-2017.firebaseio.com",
	    storageBucket: "mi-mascota-2017.appspot.com",
	    messagingSenderId: "579979923419"
	  };

	  firebase.initializeApp(config);
	  var db = firebase.database();
  	  var auth = firebase.auth();

  	  //LOGIN Obtener los elementos
	  var submitButton = document.getElementsByName("email");
	  var emailInput = document.getElementsByName("password");

}());