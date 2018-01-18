class rowCard
{
    rowCard(string kanji,string hiragan,string colour,string meaning);
    ready();

    /*-- data --*/
    string kanjiText; //saved string data of card for resetting
    string hiraganaText;
    string savedColour; //used as bound-string time one time
    int marked;
    int dontSlide;
    string-bound meaning;

    int firstModeSet;

    /*-- ids --*/
    element-id slide-main;
    element-id other-box;
    element-id hide-box;
    element-id top-text;
    element-id bot-text;

    /*-- main action functions --*/
    void-handler unhide();
    void setMode(int mode);
    void toggleMarked();

    /*-- helpers --*/
    void-handler dragslide(event e);
}