window.onload=main;

var _jsonlink;

function main()
{
    _jsonlink=document.querySelector(".new-text");

    setupDropZone();
}

//initialise drop zone related things
function setupDropZone()
{
    var dropzone=document.querySelector(".drop-zone");
    var slider=document.querySelector(".out-slider");

    dropzone.addEventListener("drop",(e)=>{
        e.preventDefault();
        slider.classList.remove("dragover");

        var datafile=e.dataTransfer.items[0].getAsFile();
        var datafileNameSplit=datafile.name.split(".");

        if (datafileNameSplit[datafileNameSplit.length-1]!="xlsx")
        {
            console.log("not an xlsx file");
            return;
        }

        readXls(datafile,datafileNameSplit[0]);
    });

    dropzone.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    dropzone.addEventListener("dragenter",(e)=>{
        slider.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave",(e)=>{
        slider.classList.remove("dragover");
    });
}

//read given FIle object and string name, turn it into data
//and put it onto the button using attachData()
//also sets loaded state
function readXls(datafile,name)
{
    var f=new FileReader();
    f.onload=()=>{
        var wb=XLSX.read(f.result,{type:"binary"});

        var jsondata=XLSX.utils.sheet_to_json(wb.Sheets.Sheet1,{
            header:1
        });

        var formatdata=[];
        var rubys;
        var formatrubys;
        for (var x=0,l=jsondata.length;x<l;x++)
        {
            if (jsondata[x].length>3)
            {
                rubys=jsondata[x].slice(3);
                formatrubys=[];
                for (var y=0,yl=rubys.length;y<yl;y+=2)
                {
                    formatrubys.push([rubys[y],rubys[y+1]]);
                }

                formatdata.push({
                    maindata:jsondata[x].slice(0,3),
                    rubys:formatrubys
                });
            }

            else
            {
                formatdata.push({maindata:jsondata[x]});
            }
        }

        attachData(formatdata,name);
        document.querySelector(".zones").classList.add("loaded");
    };

    f.readAsBinaryString(datafile);
}

//prepare json download button for downloading
function attachData(data,name)
{
    _jsonlink.href=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({kcards:data}))}`;
    _jsonlink.download=`${name}.json`;
}