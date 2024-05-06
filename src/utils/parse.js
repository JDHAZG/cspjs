const xlsx=require('xlsx')
function excelParse(buff) {
    const workbook = xlsx.read(buff);
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 这里取第 0 个 sheet
    const json = xlsx.utils.sheet_to_json(sheet); // 得到的 json 是解析之后的数据
    return json
}
exports.excelParse=excelParse