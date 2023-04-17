import {poolReadOnly} from "../createMysqlPool.js";


export function getRecordsInfo(tool,user) {
    return new Promise(async (resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql // admin可以看所有人的记录，而user只能看自己的记录；
        if(tool==="all") selectSql = `SELECT * FROM analysis_records`
        else if (user==="admin") selectSql =`SELECT * FROM analysis_records WHERE tool=?`
        else selectSql = `SELECT * FROM analysis_records WHERE tool=? AND user=?`
        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, [tool, user], (err, result) => {
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