window.onload=main;

function main()
{
    var dropzone=document.querySelector(".dropzone");

    dropzone.addEventListener("drop",(e)=>{
        e.preventDefault();

        var f=new FileReader();

        f.onload=()=>{
            var wb=XLSX.read(f.result,{type:"binary"});

            console.log(wb);
        };

        f.readAsBinaryString(e.dataTransfer.items[0].getAsFile());
    });

    dropzone.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });
}
