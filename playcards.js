//gathering external resources
var inquirer = require ('inquirer');
var fs = require ('fs');
var basicQuestions = require('./basic-cards.json');
var clozeQuestions = require ('./cloze-cards.json');

//game state variables
var questionNumber = 0;
var questionsRight = 0;
var questionsWrong = 0;

//BASIC QUIZ -- to be used for basic cards

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
			reset();
		}
	});
}	

//CLOZE QUIZ, for cloze questions

function clozeQuiz() {

	var cardQuestions = [
		{
			type: 'input',
			name: 'question',
			message: clozeQuestions[questionNumber].partial
		}
	];

	inquirer.prompt(cardQuestions).then(function(user) {
		//first if statement checks for a matching (correct) answer. 
		if (user.question == clozeQuestions[questionNumber].cloze) {
			questionNumber++;
			questionsRight ++;
			console.log ('You got it!');	
		} else {
			console.log('incorrect! ' +  clozeQuestions[questionNumber].fullText);
			questionNumber++;
			questionsWrong ++; 
		}
		//this if statement checks whether to run the function again to advance to the next question.
		//if not, it displays the final result.
		if (questionNumber < clozeQuestions.length) {
			clozeQuiz();
		} else {
			console.log('You finished!');
			console.log('Final score: ' + questionsRight + ' correct, '  + questionsWrong  + ' incorrect.');
			reset();
		}
	});
}	

//reset gives the player the option to play again. If they choose to, this resets all the variables and runs playCards.
function reset() {
	inquirer.prompt([
		{
			type: 'confirm',
			name: 'playAgain',
			message: 'Play again?',
		}

	]).then(function(user){
		if(user.playAgain == 'Yes') {
			questionNumber = 0;
			questionsRight = 0;
			questionsWrong = 0;
			playCards();
		}
	});
}

// Play Cards. User chooses which kind of questions to answer.
function playCards() {

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

}

playCards();