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

	var cardQuestions = [
		{
			type: 'input',
			name: 'question',
			message: basicQuestions[questionNumber].front
		}
	];

	//using a counter (questionsNumber) instead of a traditional loop to account for the asynchronous nature of inquirer

	inquirer.prompt(cardQuestions).then(function(user) {
		//first if statement checks for a matching (correct) answer. 
		if (user.question == basicQuestions[questionNumber].back) {
			questionNumber++;
			questionsRight ++;
			console.log ('You got it!');	
		} else {
			console.log('Nope! the correct answer was ' + basicQuestions[questionNumber].back + '.');
			questionNumber++;
			questionsWrong ++; 
		}

		//this if statement checks whether to run the function again to advance to the next question.
		//if not, it displays the final result.
		if (questionNumber < basicQuestions.length) {
			basicQuiz();
		} else {
			console.log('You finished!');
			console.log('Final score: ' + questionsRight + ' correct, '  + questionsWrong  + ' incorrect.');
		}
	});
}	


//CLOZE QUIZ

function clozeQuiz() {

	var cardQuestions = [
		{
			type: 'input',
			name: 'question',
			message: clozeQuestions[questionNumber].partial
		}
	];

	inquirer.prompt(cardQuestions).then(function(user) {
		if (user.question == clozeQuestions[questionNumber].cloze) {
			questionNumber++;
			console.log ('correct!');	
		} else {
			console.log('incorrect! ' +  clozeQuestions[questionNumber].fullText);
			questionNumber++;
		}

		//checking to see whether to move on to the next question
		if (questionNumber < clozeQuestions.length) {
			clozeQuiz();
		} else {
			console.log('you finished!');
		}
	});
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

