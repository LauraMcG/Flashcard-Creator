// var inquirer = require ('inquirer');

var fs = require ('fs');
var basicQuestions = require('./basic-cards.json');
var basicQuestions = require ('./basic-cards.json');

var questionNumber = 0;
var questionsRight = 0;
var questionsWrong = 0;

// console.log(basicQuestions[0].back);

// console.log(basicQuestions);

for (var i = 0; i < basicQuestions.length; i++) {
	console.log(basicQuestions[i].back);
}