rowCard[] _cards; //array of cards
element _cardZone; //card insert element
int _mainColour; //randomised colour on startup
int _currentMode;

element _rmodeImg;

void main();

void initialiseMenu(string uiColour);

/*-- card actions --*/
//reset all cards action
void resetCards();

/*-- card data handling --*/
//load cards from given data file name, calls callback
void-callback getCard(string card,function callback(object data));
//helper, converts data array into rowcard object
rowCard array2Card(array data);
rowCard kcard2card(object data);

/*-- utility --*/
void randomiseArray(array array);
int randint(int min,int max);