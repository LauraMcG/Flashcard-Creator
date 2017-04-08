
//BASIC CARD -------
//basic card is a basic flash card:
// question on the front, answer on the back
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

//CLOZE CARD -------
//Cloze card is a fill-in-the-blank.
//user will submit the full text and the section they want to remove.

function ClozeCard (fullText, cloze) {
	this.fullText = fullText;
	this.cloze = cloze;
}

//the partial section will be created by searching the full text for the cloze.
//If the submitted cloze does not exist, it will show an error.

ClozeCard.prototype.partialSearch = function() {
		var clozeStart = this.fullText.indexOf(this.cloze);

		 if (clozeStart == -1) {
		 	console.log('Text not found!');
		 } else {	
		 	this.partial = this.fullText.replace(this.cloze, '...');
		 }
}		 


var brokenQuestion = new ClozeCard('This is going to break', 'yes');
var workingQuestion = new ClozeCard('This will not break ', 'will not');

workingQuestion.partialSearch();

console.log (workingQuestion.partial);