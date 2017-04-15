//pulling in required files
var fs = require('fs');

//declaring global variables
//basicCardArray collects all the cards that are created so they can be written to a json file.
var basicCardArray = [];

//BASIC CARD -------
//basic card is a constructor for a basic flash card:
// question on the front, answer on the back
function BasicCard(front, back) {
	if(this instanceof BasicCard) {
    	this.front = front;
		this.back = back;
  	} else {
    	return new BasicCard(front, back);
    }
}



/*saveCard pushes the declared card into basicCardArray
then writes the entire array into the basic-cards JSON file.

This works for now. If I have time to make a front end for this,
I would probably set up card creation as a series of Inquirer prompts,
collecting in the array as I go, then pushing the whole thing all at once
instead of rewriting the whole thing every time.
*/
BasicCard.prototype.saveCard = function() {
	basicCardArray.push(this);

	var cardArrayJson = JSON.stringify(basicCardArray);
	fs.writeFile('basic-cards.json', cardArrayJson, 'utf8', 'callback');
};

var tittle = new BasicCard ('What do you call the dot on top of a lower case "i"?', 'tittle');
var bakersDozen = BasicCard ('How many items are in a bakers dozen?', '13');
var interrobang = BasicCard ('What is the punctuation mark that is a combination of an exclaimation point and question mark?', 'interrobang');

tittle.saveCard();
bakersDozen.saveCard();
interrobang.saveCard();

