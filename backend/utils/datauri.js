// import DatauriParser from "datauri/parser.js"
// import path from "path";

// const getDatauri =(file)=>{
//     const parser = new DatauriParser();
//     const exName =path.extname(file.originalname).toString();
//     return parser.format(exName,file.buffer);
   
// }
// export default getDatauri;

import DatauriParser from "datauri/parser.js";
import path from "path";

const getDatauri = (file) => {
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    const datauri = parser.format(extName, file.buffer);
    return datauri.content; // Return only the content (Data URI string)
} 

export default getDatauri;
