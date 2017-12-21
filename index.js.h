rowCard[] _cards; //array of cards
element _cardZone; //card insert element
int _mainColour; //randomised colour on startup

void main();

//reset all cards action
void resetCards();
void setModes(int mode);

//load cards from given data file name, calls callback
void-callback getCard(string card,function callback(object data));
//helper, converts data array into rowcard object
rowCard array2Card(array data);

void randomiseArray(array array);
int randint(int min,int max);