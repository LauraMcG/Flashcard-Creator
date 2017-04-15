//pulling in required files
var fs = require('fs');

//declaring global variables
//basicCardArray collects all the cards that are created so they can be written to a json file.
var clozeCardArray = [];

//CLOZE CARD -------
/*Cloze card is a constructor for a fill-in-the-blank question.
user will submit the full text and the section they want to remove.
*/

function ClozeCard (fullText, cloze) {
	this.fullText = fullText;
	this.cloze = cloze;
}

/*the partial sentence for the cloze card will be created by searching the full 
text for the cloze and replacing it with '...'
If the submitted cloze does not exist, it will return an error. 
*/

ClozeCard.prototype.partialSearch = function() {
		//first searching the full text for the cloze phrase.
		//storing the index of the start of the cloze in a variable
		var clozeStart = this.fullText.indexOf(this.cloze);

		//-1 means the cloze phrase does not appear in the full text.
		//so, this displays an error if the phrase is not found
		//otherwise the cloze is removed to create the partial phrase
		 if (clozeStart == -1) {
		 	console.log('Text not found!');
		 } else {	
		 	this.partial = this.fullText.replace(this.cloze, '...');
		 }
}		 

ClozeCard.prototype.saveCard = function() {
	clozeCardArray.push(this);
	// console.log (clozeCardArray);

	var cardArrayJson = JSON.stringify(clozeCardArray);
	fs.writeFile('cloze-cards.json', cardArrayJson, 'utf8', 'callback');
};

var aglet = new ClozeCard ('An aglet is the plastic enclosure on the ends of a shoelace.', 'aglet');
var treadmill = new ClozeCard ('The treadmill, originally invented as a device to work prisoners to death, is now a common piece of fitness equipment.', 'treadmill');

aglet.partialSearch();
treadmill.partialSearch();

aglet.saveCard();
treadmill.saveCard();