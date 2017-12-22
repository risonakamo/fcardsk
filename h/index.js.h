rowCard[] _cards; //array of cards
element _cardZone; //card insert element
int _mainColour; //randomised colour on startup
int _currentMode;

void main();

void initialiseMenu(string uiColour);

/*-- card actions --*/
//reset all cards action
void resetCards();
void setModes(int mode);

/*-- card data handling --*/
//load cards from given data file name, calls callback
void-callback getCard(string card,function callback(object data));
//helper, converts data array into rowcard object
rowCard array2Card(array data);

/*-- utility --*/
void randomiseArray(array array);
int randint(int min,int max);