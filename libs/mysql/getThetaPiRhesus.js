import {poolReadOnly} from "../createMysqlPool.js";


export function getThetaPiRhesus(RNAIds) {
    return new Promise((resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql = `select distinct * from thetaPi_rhesus thetaPi, snpCount_rhesus snpCount, transcriptCoverage_rhesus transCov
                         where thetaPi.RNAAcc in (${RNAIds}) and thetaPi.RNAAcc = snpCount.RNAAcc and thetaPi.RNAAcc = transCov.RNAAcc`
        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, (err, result) => {
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