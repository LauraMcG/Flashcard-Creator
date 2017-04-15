var inquirer = require ('inquirer');
var fs = require ('fs');
var basicQuestions = require('./basic-cards.json');
var clozeQuestions = require ('./cloze-cards.json');

//game state variables
var questionNumber = 0;
var questionsRight = 0;
var questionsWrong = 0;

//BASIC QUIZ

function basicQuiz() {

	//cardQuestions sets up the basic template for questions.


	function ask(count) {

	var cardQuestions = [
		{
			type: 'input',
			name: 'question',
			message: basicQuestions[count].front
		}
	];

		inquirer.prompt(cardQuestions).then(function(user) {
			if (user.question == basicQuestions[count].back) {
				questionNumber++;
				console.log ('correct!');	
			} else {
				console.log('incorrect!');
				questionNumber++;
			}

			//checking to see whether to move on to the next question
			if (questionNumber < basicQuestions.length) {
				ask(questionNumber);
			} else {
				console.log('you finished!');
			}
		});
	}

	ask(questionNumber);	
}


//CLOZE QUIZ

function clozeQuiz() {
	console.log('cloze quiz works!');
}


// Opening question. User chooses which kind of questions to answer.
inquirer.prompt([
	{
		type: 'list',
		name: 'quizType',
		message: 'what kind of flash cards do you want to answer?',
		choices: ['Basic', 'Cloze']
	}

]).then (function(answer) {
	if (answer.quizType === 'Basic') {
		basicQuiz();
	} else if (answer.quizType === 'Cloze') {
		clozeQuiz();
	}

});

// console.log(basicQuestions[0].back);

// console.log(basicQuestions);

