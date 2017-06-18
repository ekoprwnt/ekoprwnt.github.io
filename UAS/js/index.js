$(document).foundation();

var topBarLeft = document.getElementById("topBarLeft"),
    topBarRight = document.getElementById("topBarRight"),
    total = document.getElementById("total");

var welcome = document.getElementById("welcome"); 
var message = document.getElementById("message");
var results = document.getElementById("results");

var startButton = document.getElementById("startButton"),
    quizContainer = document.getElementById("quizContainer"),
    quizNotify  = document.getElementById("quizNotify"),
    quizLength = 0,
    choices = [] ,
    index = 0,
    formContainer = document.getElementById("formContainer"),
    form = document.form1,
    warning = document.getElementById("warning");

var allQuestions =  [
	{
    "question":"Berapa hasil dari 8 + 7?",
    "choices":["15","16","17","12"],
    "correctAnswer":0
  },
  {
    "question":"Berapa hasil dari 9 + 8?",
    "choices":["15","19","17","18"],
    "correctAnswer":2
  },
  {
    "question":"Berapa hasil dari 7 + 5?",
    "choices":["14","12","16","17"],
    "correctAnswer":1
  },
  {
    "question":"Berapa hasil dari 18 - 12?",
    "choices":["8","7","6","5"],
    "correctAnswer":2
  },
{
    "question":"Berapa hasil dari 15 - 5?",
    "choices":["5","10","16","17"],
    "correctAnswer":1
},
{
    "question":"Berapa hasil dari 14 - 8?",
    "choices":["6","8","16","24"],
    "correctAnswer":0
  },
{
    "question":"Berapa hasil dari 7 * 5?",
    "choices":["14","35","23","24"],
    "correctAnswer":1
},
{
    "question":"Berapa hasil dari 25 * 5?",
    "choices":["225","135","125","175"],
    "correctAnswer":2
  },
{
    "question":"Berapa hasil dari 36 * 5?",
    "choices":["80","280","340","180"],
    "correctAnswer":3
  },
{
    "question":"Berapa hasil dari 6 * 4?",
    "choices":["26","25","24","23"],
    "correctAnswer":2
  }
  ];

var storedAnswers = [];
var storedScores = [];

var quizButtons = document.getElementById("quizButtons"),
    prevButton = document.getElementById("prevButton"),
		next = document.getElementById("next"),
    nextButton = document.getElementById("nextButton"),
    scoreButton = document.getElementById("scoreButton");

var scoreDisplay = document.getElementById("scoreDisplay"),
    myScores = document.getElementById("myScores");

var progressBar = document.getElementById("progressBar");
var progressMeter = document.getElementById("progressMeter");
var progressMeterText = document.getElementById("progressMeterText");
//quizButtons.classList.add("hide");
//scoreDisplay.setAttribute("style", "display:visible");

startButton.addEventListener("click", startQuiz);
myScores.addEventListener("click", showUserScores);
prevButton.addEventListener("click", previousQuestion);
nextButton.addEventListener("click", nextQuestion);
scoreButton.addEventListener("click", showScore);

  
//shows welcome message and startbutton
quizContainer.classList.remove("hide");
// three parts of quizContainer:
quizNotify.classList.remove("hide");
formContainer.classList.add("hide");
quizButtons.classList.add("hide");
progressBar.classList.add("hide");
progressBar.setAttribute("aria-valuemax", quizLength);

message.innerHTML = "Sugeng Rawuh! <br/>Selamat Datang di Soal Latihan! <br />Siap Dek? <br/><br/> | Bismillah ben lancar dek |";
startButton.setAttribute("style", "display:visible");


function startQuiz() {
  index = 0;
  quizNotify.classList.add("hide");
  quizButtons.classList.remove("hide");
	progressBar.classList.remove("hide");

  if (storedAnswers.length !== 0) {
   storedAnswers.length = 0; 
	}
  
  quizLength = allQuestions.length;
	showProgress(index);
  showQuestion();
}

function showQuestion() {
  showQuizButtons();
  if (index === quizLength) {
    return;
  }
  // display of question at given index:
  formContainer.classList.remove("hide");
  form.innerHTML = "";
  var quizItem = allQuestions[index];
  var q = document.createElement("h3");
  var text = document.createTextNode(quizItem.question);
	var storedAnswer = storedAnswers[index];
  
  q.appendChild(text);
  form.appendChild(q);

  // display of choices, belonging to the questions at given index:
  choices = allQuestions[index].choices;

  for (var i = 0; i < choices.length; i++) {
    var div = document.createElement("div");
		div.classList.add("radio");

    var input = document.createElement("input");
    input.setAttribute("id", i);
    input.setAttribute("type", "radio");
    input.setAttribute("name", "radio");

    if (i === quizItem.correctAnswer) {
      input.setAttribute("value", "1");
    } else {
      input.setAttribute("value", "0");
    }
    //if question has been answered already
    if (storedAnswer) {
      var id = storedAnswer.id;
      if (i === id) {
        // if question is already answered, id has a value
        input.setAttribute("checked", "checked");
      }
    }

    //if radiobutton is clicked, the chosen answer is stored in array storedAnswers
    input.addEventListener("click", storeAnswer);

    var label = document.createElement("label");
		label.setAttribute("class", "radio-label");
		label.setAttribute("for", i);
    var choice = document.createTextNode(choices[i]);
    label.appendChild(choice);
	 
    div.appendChild(input);
		div.appendChild(label);
   
    form.appendChild(div);
  }
	 
	
}

function showProgress(index) {
	 ///update progress bar
   var increment = Math.ceil((index) / (quizLength) * 100);
	// var increment = index;
    progressMeter.style.width = (increment) + '%';
    progressMeterText.innerHTML = (index) + ' dari ' + quizLength;
	if (index === 0) {
		progressMeter.style.width = (25) + '%';
		progressMeter.style.background = "#ffffff";
		//progressMeterText.style.color = "000000";
	}
	else {
		progressMeter.style.background = "#689F38";
	}
}

function storeAnswer(e) {
    var element = e.target;
    var answer = {
      id: element.id,
      value: element.value
    };
    storedAnswers[index] = answer;
}

function showQuizButtons() {
  if(index === 0) {
    //there is no previous question when first question is shown
    prevButton.classList.add("hide");
  }
  if (index > 0) {
    prevButton.classList.remove("hide");
  }
  if(index === quizLength) {
    //only if last question is shown user can see the score
    scoreButton.classList.remove("hide");
    nextButton.classList.add("hide");
    //prevButton still visible so user can go back and change answers
    var h2 = document.createElement("h2");
    h2.innerHTML = "Rampung! Pingin ndelok nilaine dek?";
    form.appendChild(h2);
  }
  else {
    nextButton.classList.remove("hide");
    scoreButton.classList.add("hide");
  }
}

// http://jsfiddle.net/hvG7k/
function previousQuestion() {
  //shows previous question, with chosen answer checked
  index--;
	warning.innerHTML = "";
  form.innerHTML = "";
  $("#form1").fadeOut(0, function() {
    var show = showQuestion();
    $(this).attr('innerHTML', 'show').fadeIn(300);
  });
}

function nextQuestion() {
  //shows next question only if current question has been answered
  if (storedAnswers[index] == null) {
    warning.innerHTML = "Silahkan Pilih Salah Satu Jawaban Yang Anda Anggap Benar!";
    return;
  }
	
  index++;
    warning.innerHTML = "";
    form.innerHTML = "";
    $("#form1").fadeOut(0, function() {
      var show = showQuestion();
      $(this).attr('innerHTML', 'show').fadeIn(300);
    });
	showProgress(index);
}

function showScore() {
  form.innerHTML = "";
  prevButton.classList.add("hide");
  scoreButton.classList.add("hide");
	progressBar.classList.add("hide");

  quizNotify.classList.remove("hide");
  startButton.classList.remove("hide");	

  var totalScore = 0;
	
  var output = "";
	var questionResult = "NA";

  for (var i = 0; i < storedAnswers.length; i++) {
    var score = parseInt(storedAnswers[i].value);
		if (score === 1) {
			questionResult = '<i class="fi-check green"></i>';
			
		}
		else {
			questionResult = '<i class="fi-x red"></i>';
		}
		output = output + '<p>Soal ' + (i + 1) + ': ' + questionResult + '</p> ';
    totalScore += score;
  }

  if (totalScore === allQuestions.length) {
    message.innerHTML = "Hebat! Nilaimu "  + totalScore + " seko " + allQuestions.length + " dek!<br />Selamat!";
  }
  else if (totalScore <= 7) {
    message.innerHTML = "Nilaimu kurang dek!<br/> Mesti banyak latihan, nilaimu "  + totalScore + " seko " + allQuestions.length + " dek!<br />Ayo sinau meneh!";
  }
  else {
    message.innerHTML = "Selamat! Nilaimu apik dek, nilaimu "  + totalScore + " seko " + allQuestions.length + " dek!<br />Gelem latihan meneh?";
  }

results.innerHTML = output;	
 // Total Score e
storedScores.push(totalScore);
	updateScore(totalScore);
}



//Ndelok Total Score
function showUserScores(e) {
  e.preventDefault();
  var showUserScores = document.getElementById("showUserScores");

  while (showUserScores.firstChild) {
    showUserScores.removeChild(showUserScores.firstChild);
  }
	if (myScores.innerHTML === "Show my scores") {
		myScores.innerHTML = "Hide my scores";
		 }
	else if (myScores.innerHTML === "Hide my scores") {
		myScores.innerHTML = "Show my scores";
	}

  var userScores = storedScores;
	var h4 = document.createElement("h4");
	h4.innerHTML = "Nilai Anda Sebelumnya";
	var string = "";
	for (var i = 0; i < storedScores.length; i++) {
		string += storedScores[i] + "<br/>";
	}
 
  var p = document.createElement("p");
	p.setAttribute("id", "scores");

  if (userScores.length === 0) {
    string = "Koe durung nggarap soal le!";
  }
  p.classList.add("emphasis");
  p.innerHTML = string;
  showUserScores.appendChild(h4);
	showUserScores.appendChild(p);
}

function updateScore(score) {
	var showUserScores = document.getElementById("showUserScores");
	var scores = document.getElementById("scores");
	
	if (myScoreDisplay.classList.contains("slideInMyScore")) {
		scores.innerHTML = "";
		var string = "";
		for (var i = 0; i < storedScores.length; i++) {
			string += storedScores[i] + "<br/>";
		}
 
		
 		scores.innerHTML = string;
	}
}