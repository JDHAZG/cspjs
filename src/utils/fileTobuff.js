const FileReader = require('filereader');
function fileToBuf(file){
    var fr = new FileReader();
    var filename = file.name;

    fr.readAsArrayBuffer(file);
    fr.addEventListener("loadend",(e) => {
        var buf = e.target.result;
        return buf
    },false);
}
exports.fileToBuf=fileToBuf