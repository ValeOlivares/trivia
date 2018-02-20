function trivia() {
	this.signInButton = document.getElementById('signin');
	this.signOutButton= document.getElementById('logout');
	this.signInButton.addEventListener('click', this.signIn.bind(this));
	this.signOutButton.addEventListener('click', this.signOut.bind(this));
	this.initFirebase();
};

trivia.prototype.signIn = function() {
	var provider = new firebase.auth.GoogleAuthProvider();
	this.auth.signInWithPopup(provider);
};

trivia.prototype.signOut = function() {
	this.auth.signOut();
};

trivia.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

trivia.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    $('#log').hide();
    $('#mainPage').show();
   } else {
   	$('#mainPage').hide();
   }
};

window.onload = function() {
	myTrivia = new trivia();
};

let display = document.querySelector('.display');
fetch('https://opentdb.com/api.php?amount=10')
  .then(function(response) {
  //Turns the the JSON into a JS object
  return response.json();
})
  .then(function(data) {
  	console.log(data.results);

//Let's make some HTML!
    let html = `<h2><a href="${data.html_url}">${data.login}</a></h2>
      <p>${data.name}</p>
      <p>Followers: ${data.followers}</p>
    `;

    //Put that HTML on the page
    display.innerHTML = html;
  });

 //Gonna go get some cool data with this.
// let req = new XMLHttpRequest();
//
// //Start the XHR setup.
// //I am going to GET it at the location in the URL.
// req.open("GET", "https://api.github.com/users/drpepper");
// //I want to know when it is done.
// req.addEventListener("load", reqListener);
// //Okay, send the request now.
// req.send();




