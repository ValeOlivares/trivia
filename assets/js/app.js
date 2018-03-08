//----FIREBASE ----//
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

//----FIN FIREBASE ----//

//----TRIVIA ----//
var trivia;
var correctAnswers = 0;
var incorrectAnswers = 0;
var index = 0;

$.ajax({
    url: "https://opentdb.com/api.php?amount=10&category=27&type=multiple",
    method: "GET"
}).done(function(response) {

    trivia = response;
    if (index >= trivia.results.length) {
        $("#display").html("¿ Quieres saber tu puntaje? <br>Correctas: " + correctAnswers + "<br>Incorrectas: " + incorrectAnswers);
        $("#display").append("<br><br><button class='reset-button' id='replay'>Play Again</button>");
        $(".reset-button").click(function() {
            index = 0;
            correctAnswers = 0;
            incorrectAnswerss = 0;
            displayQuestion();
        });
    } else { displayQuestion(); }
		function displayQuestion() {
        if (index >= trivia.results.length) {
            $("#display").html("¿Quieres saber tu puntaje? <br>Correctas: " + correctAnswers + "<br>Incorrectas: " + incorrectAnswers);
            $("#display").append("<br><br><button class='button' id='replay'>Play Again</button>");
            $(".button").click(function() {
                index = 0;
                correctAnswers = 0;
                incorrectAnswerss = 0;
                displayQuestion();
            });
        }
        var answers = [trivia.results[index].incorrect_answers[0], trivia.results[index].incorrect_answers[1], trivia.results[index].incorrect_answers[2], trivia.results[index].correct_answer];
        var rightAnswer = trivia.results[index].correct_answer;
        function shuffle(array) {
            var i = 0,
                j = 0,
                temp = null

            for (i = array.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1))
                temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        }
        shuffle(answers);
        $("#display").html(trivia.results[index].question + "<br><br>");
        for (k = 0; k < answers.length; k++) {
            $("#display").append("<button class='button' value='" + answers[k] + "'>" + answers[k] + "</button>");
        }
        var timeRemaining = 30;
        $("#display").append("<div id='countdown'></div>");
        var countdownClock = setInterval(countdown, 1000);
        function countdown() {

            $("#countdown").html("<br><br>Time remaining: " + timeRemaining);
            timeRemaining--;
            if (timeRemaining == -1) {
            	timeRemaining = 30;
            	clearInterval(countdownClock);
            	incorrectAnswer(); }
        };
        $(".button").click(function() {
        		clearInterval(countdownClock);
            if (this.value == trivia.results[index].correct_answer) {    
                correctAnswer();
            }
            else {
                incorrectAnswer();
            }
        });
        //Si no contrsta en el tiempo  indicado
        function incorrectAnswer() {
            $("#display").html("NOOOOOOO!!!!");
            incorrectAnswers++;
            index++;
            setTimeout(displayQuestion, 3000);
        }
        function correctAnswer() {
            $("#display").html("Correcto! ;D");
            correctAnswers++;
            index++;
            setTimeout(displayQuestion, 3000);
        }

    }

});