import {poolReadOnly} from "../createMysqlPool.js";


export function getGeneList(idType,keyword) {
    return new Promise((resolve, reject) => {
        let selectSql = ''
        // 判断基因名类型
        if (idType === "symbol") {
            // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
            selectSql = `select * from rb_gene where (symbol like ? or alias like ? or humanSymbol like ?) 
                    and (taxID = '9544') order by entrezID, humanEntrez;`
            // 连接mysql连接池
            poolReadOnly.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(selectSql, [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)))
                    }
                });
                connection.release();
            });
        } else if (idType === "entrezID") {
            // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
            selectSql = `select * from rb_gene where (entrezID like ? or humanEntrez like ?) and (taxID = '9606' 
                        or taxID = '9544') order by entrezID, humanEntrez;`
            console.log(selectSql)
            // 连接mysql连接池
            poolReadOnly.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(selectSql, [`%${keyword}%`,`%${keyword}%`], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)))
                    }
                });
                connection.release();
            });
        }else if (idType === "ensemblID"){
            // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
            selectSql = `select * from rb_gene rb, gene2ensembl ge where (rb.taxID = '9544') and (rb.entrezID=ge.entrezID) 
                        and (ge.ensGeneID like ? or ge.ensRNAID like ? or ge.ensProID like ?) order by ge.ensGeneID, 
                        ge.ensRNAID, ge.ensProID`
            // 连接mysql连接池
            poolReadOnly.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(selectSql, [`%${keyword}%`,`%${keyword}%`,`%${keyword}%`], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)))
                    }
                });
                connection.release();
            });
        }else if (idType === "location"){
            const keyWord = keyword.replaceAll(",", "");
            let chr = "", start= "", end="";
            if(keyWord.match("^chr.+:\\d+-\\d+$")){
                chr = keyWord.split(":")[0].replace("chr","");
                start = keyWord.split(":")[1].split("-")[0];
                end = keyWord.split(":")[1].split("-")[1];
            }else if(keyWord.match("^chr.+:\\d+[+]\\d+$")){ // chr:strat+length
                chr = keyWord.split(":")[0].replace("chr","");
                start = keyWord.split(":")[1].split("+")[0];
                let length = parseInt(keyWord.split(":")[1].split("+")[1]);
                end = String(parseInt(start) + length);
            }else{
                resolve([])
                return
            }
            // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
            selectSql = `select * from rb_gene where (chr = ? and start < ? and end > ?) and (taxID = '9544') 
                        order by start, end`
            // 连接mysql连接池
            poolReadOnly.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(selectSql, [`%${chr}%`,`%${start}%`,`%${end}%`], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)))
                    }
                });
                connection.release();
            });
        }
    })
}