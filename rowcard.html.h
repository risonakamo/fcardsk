class rowCard
{
    rowCard();
    ready();

    string kanjiText;
    string hiraganaText;

    bound-string hideColour; //colour of hide panel, html bounded

    element-id other-box;
    element-id hide-box;
    element-id top-text;
    element-id bot-text;


    void unhide();
    void setMode(int mode);
}