window.onload=main;

var _cards=[];
var _cardZone;
var _mainColour;
var _currentMode=0;

function main()
{
    _cardZone=document.querySelector(".card-zone");
    _mainColour=randint(0,359);
    var uiColour="#"+new tinycolor(`hsv(${_mainColour},${randint(40,100)},${randint(70,90)})`).toHex();
    document.head.insertAdjacentHTML("beforeend",`<meta name="theme-color" content="${uiColour}">`);

    initialiseMenu(uiColour);

    var args=window.location.hash.split("#");
    if (args.length>=2)
    {
        document.title=`fcardsk - ${args[1]}`;

        var cardsType;
        getCard(args[1],(d)=>{
            if (d.boxes)
            {
                cardsType=0;
                d=d.boxes;
            }

            else if (d.kcards)
            {
                cardsType=1;
                d=d.kcards;
            }

            for (var x=0,l=d.length;x<l;x++)
            {
                if (cardsType)
                {
                    _cards.push(kcard2card(d[x]));
                }

                else
                {
                    _cards.push(array2Card(d[x]));
                }
            }

            randomiseArray(_cards);

            for (var x=0,l=_cards.length;x<l;x++)
            {
                _cardZone.appendChild(_cards[x]);
            }
        });
    }
}

function resetCards()
{
    _cardZone.innerHTML="";

    randomiseArray(_cards);

    for (var x=0,l=_cards.length;x<l;x++)
    {
        _cards[x].resetHide();
        _cards[x].setMode(_currentMode);
        _cardZone.appendChild(_cards[x]);
    }

    window.scrollTo(0,0);
}

function getCard(card,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`cards/${card}.json`);

    r.onreadystatechange=()=>{
        if (r.readyState==4 && r.status==200)
        {
            callback(JSON.parse(r.response));
        }
    }

    r.send();
}

//give it a SINGLE CARD represented with an array
//from a getCard data array result
function array2Card(data)
{
    if (data.length==2)
    {
        return new rowCard(data[0],data[1],"#"+new tinycolor(`hsv(${_mainColour},${randint(40,100)},${randint(70,90)})`).toHex());
    }

    var kanji=data[0].split("");
    var rubyData=data[2];
    var rubyIndex;

    for (var x=0;x<rubyData.length;x+=2)
    {
        rubyIndex=parseInt(rubyData[x]);
        kanji[rubyIndex]=`<ruby>${kanji[rubyIndex]}<rt>${rubyData[x+1]}</rt></ruby>`;
    }

    return new rowCard(kanji.join(""),data[1],"#"+new tinycolor(`hsv(${_mainColour},${randint(40,100)},${randint(70,90)})`).toHex());
}

function kcard2card(data)
{
    if (!data.rubys)
    {
        return new rowCard(data.maindata[0],data.maindata[1],
            "#"+new tinycolor(`hsv(${_mainColour},${randint(40,100)},${randint(70,90)})`).toHex(),
            data.maindata[2]);
    }

    var kanji=data.maindata[0].split("");
    var rubyIndex;

    for (var x=0,l=data.rubys.length;x<l;x++)
    {
        rubyIndex=parseInt(data.rubys[x][0]);
        kanji[rubyIndex]=`<ruby>${kanji[rubyIndex]}<rt>${data.rubys[x][1]}</rt></ruby>`;
    }

    return new rowCard(kanji.join(""),data.maindata[1],
        "#"+new tinycolor(`hsv(${_mainColour},${randint(40,100)},${randint(70,90)})`).toHex(),
        data.maindata[2]);
}

function randomiseArray(array)
{
    var t;
    var ri;
    for (var x=array.length-1;x>0;x--)
    {
        ri=randint(0,x);
        t=array[x];
        array[x]=array[ri];
        array[ri]=t;
    }
}

function randint(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}

function setModes(mode)
{
    for (var x=0,l=_cards.length;x<l;x++)
    {
        _cards[x].setMode(mode);
    }
}

function initialiseMenu(uiColour)
{
    var menubar=document.querySelector(".menu-bar");
    var buttons=menubar.querySelectorAll(".button");

    menubar.style.backgroundColor=uiColour;

    //change random mode
    buttons[0].addEventListener("click",(e)=>{
        _currentMode++;

        if (_currentMode>2)
        {
            _currentMode=0;
        }

        for (var x=0,l=_cards.length;x<l;x++)
        {
            _cards[x].setMode(_currentMode);
        }
    });

    //reset cards
    buttons[1].addEventListener("click",(e)=>{
        resetCards();
    });

}