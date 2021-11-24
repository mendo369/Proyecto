const excelGenerate = (products, name, res)=>{
    const xl = require('excel4node');

    products = products.map((product)=>{
        let id = product._id.toString();
        delete product._id;
        return{
            id,
            ...product
        }
    })

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('inventario');
    for (let i = 1; i <= products.length; i++) {//recorre filas
        for (let j = 0; j < Object.values(products[0]).length; j++) {//rrecorre columnas
            let data = Object.values(products[i-1])[j-1];
            if (typeof data === 'string') {
                ws.cell(i, j).string(data)
            }if (typeof data === 'number'){
                ws.cell(i, j).number(data);
            }
        }
    }

    wb.write(`${name}.xlsx`, res);
};

module.exports.ProductUtils = {
    excelGenerate
}