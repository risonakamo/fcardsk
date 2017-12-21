window.onload=main;

function main()
{
    getCard("l18-kanji",(d)=>{
        d=d.boxes;
        var cardZone=document.querySelector(".card-zone");
        for (var x=0,l=d.length;x<l;x++)
        {
            console.log(d[x]);
            cardZone.appendChild(array2Card(d[x]));
        }
    });
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