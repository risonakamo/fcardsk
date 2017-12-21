class rowCard
{
    rowCard(string kanji,string hiragan,string colour);
    ready();

    /*-- data --*/
    string kanjiText; //saved string data of card for resetting
    string hiraganaText;
    string savedColour; //used as bound-string time one time
    int marked;

    bound-string hideColour; //colour of hide panel, html bounded

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