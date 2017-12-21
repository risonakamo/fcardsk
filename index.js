window.onload=main;

var _cards=[];
var _cardZone;

function main()
{
    _cardZone=document.querySelector(".card-zone");
    getCard("l18-kanji",(d)=>{
        d=d.boxes;

        for (var x=0,l=d.length;x<l;x++)
        {
            _cards.push(array2Card(d[x]));
        }

        randomiseArray(_cards);

        for (var x=0,l=_cards.length;x<l;x++)
        {
            _cardZone.appendChild(_cards[x]);
        }
    });
}

function resetCards()
{
    _cardZone.innerHTML="";

    randomiseArray(_cards);

    for (var x=0,l=_cards.length;x<l;x++)
    {
        _cards[x].resetHide();
        _cardZone.appendChild(_cards[x]);
    }
}

function getCard(card,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`cards/${card}.json`);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
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
        return new rowCard(data[0],data[1],"red");
    }

    var kanji=data[0].split("");
    var rubyData=data[2];
    var rubyIndex;

    for (var x=0;x<rubyData.length;x+=2)
    {
        rubyIndex=parseInt(rubyData[x]);
        kanji[rubyIndex]=`<ruby>${kanji[rubyIndex]}<rt>${rubyData[x+1]}</rt></ruby>`;
    }

    return new rowCard(kanji.join(""),data[1],"red");
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