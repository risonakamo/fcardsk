class rowCard
{
    rowCard();
    ready();

    string kanjiText; //saved string data of card for resetting
    string hiraganaText;
    string savedColour;

    bound-string hideColour; //colour of hide panel, html bounded

    element-id slide-main;
    element-id other-box;
    element-id hide-box;
    element-id top-text;
    element-id bot-text;

    void-handler unhide();
    void setMode(int mode);

    void-handler dragslide(event e);
}