import {poolReadOnly} from "../createMysqlPool.js";


export function getGeneInfo(entrezID) {
    return new Promise((resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql = `select * from rb_gene where (entrezID = ? or humanEntrez = ?) and (taxID = '9606' 
                    or taxID = '9544') order by entrezID, humanEntrez;`
        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, [entrezID, entrezID], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(result)))
                }
            });
            connection.release();
        });
    })
}