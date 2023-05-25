import {poolReadOnly} from "../createMysqlPool.js";


export function getRefseq(entrezID) {
    return new Promise((resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql = `select distinct * from gene2refseq where entrezID = ?`
        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, [`${entrezID}`], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    const res = JSON.parse(JSON.stringify(result))
                    resolve(res.length===0 ? [] : res.map(item => item.RNAAcc))
                }
            });
            connection.release();
        });
    })
}