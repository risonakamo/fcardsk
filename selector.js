window.onload=main;

function main()
{
    var entryzone=document.querySelector(".entry-zone");

    getCardList((d)=>{
        for (var x=d.length-1;x>=0;x--)
        {
            entryzone.insertAdjacentHTML("beforeend",genEntry(d[x]));
        }
    });
}

function getCardList(callback)
{
    var r=new XMLHttpRequest();
    r.open("GET","selectorlist.json");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response).entries);
        }
    };

    r.send();
}

//takes array of 3 items for data:
//[name of entry, filename of entry, the kanji list of the entry]
function genEntry(data)
{
    var kanji=data[2].split("");
    var kanjistring="";

    for (var x=0,l=kanji.length;x<l;x++)
    {
        kanjistring+=`<div>${kanji[x]}</div>`;
    }

    return `<a href="viewer#${data[1]}" class="card-entry" style="background-color:#${new tinycolor(`hsv(${randint(0,359)},${randint(40,100)},${randint(70,90)})`).toHex()}"><div class="name">${data[0]}</div><div class="file-name">${data[1]}</div><div class="kanji">${kanjistring}</div></a>`;
}

function randint(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}