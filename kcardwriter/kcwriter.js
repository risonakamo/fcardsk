window.onload=main;

function main()
{
    setupDropZone();
}

function setupDropZone()
{
    var dropzone=document.querySelector(".dropzone");

    dropzone.addEventListener("drop",(e)=>{
        e.preventDefault();
        dropzone.classList.remove("dragover");

        var datafile=e.dataTransfer.items[0].getAsFile();
        var datafileNameSplit=datafile.name.split(".");

        if (datafileNameSplit[datafileNameSplit.length-1]!="xlsx")
        {
            console.log("not an xlsx file");
            return;
        }

        readXls(datafile);
    });

    dropzone.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    dropzone.addEventListener("dragenter",(e)=>{
        dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave",(e)=>{
        dropzone.classList.remove("dragover");
    });
}

function readXls(datafile)
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

        console.log(formatdata);
    };

    f.readAsBinaryString(datafile);
}