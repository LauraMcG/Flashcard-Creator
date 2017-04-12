//pulling in required files
var fs = require('fs');

//declaring global variables
//basicCardArray collects all the cards that are created so they can be written to a json file.
var basicCardArray = [];

//BASIC CARD -------
//basic card is a constructor for a basic flash card:
// question on the front, answer on the back
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
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
var bakersDozen = new BasicCard ('How many items are in a baker\'s  dozen?', '13');

tittle.saveCard();
bakersDozen.saveCard();


// JSON.parse(basicCardJson);

// console.log('after parse: ' + basicCardJson);



//reading and writng


// fs.appendFile('basic-cards.json', 'writefile works!', 'utf8', 'callback');

// fs.readFile('basic-cards.json', 'utf8', function(error, data) {
// 	if (error) {
// 		console.log('error occurred: ' + error );
// 		return;
// 	} else {
// 		console.log(data);
// 	}
// });
