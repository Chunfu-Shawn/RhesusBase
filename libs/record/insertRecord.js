import fs from "fs"
import {annotationLogger, pad} from "../logSave.js";
import {poolReadWrite} from "../createMysqlPool.js";
import crypto from 'crypto'


export function insertRecord(ctx, fileName, parameters) {
    return new Promise((resolve, reject) => {
        try {
            // 获取上传时间
            const rid = crypto.randomBytes(6).toString('hex');
            const now = new Date()
            const startTime = now.toLocaleString('zh')
            const YMD = String(now.getFullYear()) + pad(now.getMonth() + 1) + pad(now.getDate())
            const user = ctx.request.body.user
            const tool = ctx.request.body.tool
            const resultPath = 'public/results/' + YMD + '/' + rid
            const finishTime = null
            const status = 'ready'
            let filePath = ctx.request.files[fileName][0].destination + '/' +
                ctx.request.files[fileName][0].filename
            // whether the request is to run demo
            if (ctx.request.body.isDemo === "false") {
                // read the uploaded form
                // 如果文件上传成功，转移文件到特定目录
                const dir = 'public/results/' + YMD +'/' + rid
                fs.mkdirSync(dir, {
                    //是否使用递归创建目录
                    recursive: true,
                })
                fs.rename(filePath, dir + '/' + ctx.request.files[fileName][0].filename,
                    function (err) {
                        if (err) throw err;
                    });
            } else if (ctx.request.body.isDemo === "true") {

            } else {
                reject(`[${new Date().toLocaleString()}] Error: There is wrong in request body.`)
            }

            //创建输出目录
            fs.mkdirSync(resultPath, {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/log', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out', {
                //是否使用递归创建目录
                recursive: true
            })

            // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
            let insertSql = `INSERT INTO analysis_records VALUES (?,?,?,?,?,?,?,?);`;
            // 连接mysql连接池
            poolReadWrite.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(insertSql, [rid, user, tool, startTime, finishTime, parameters, resultPath, status], (err) => {
                        if (err) {
                            annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Adding a annotation record failed in MySQL: ${err.message}`)
                        } else {
                            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: Add a record into MySQL successfully.`)
                        }
                    })
                connection.release()
            })
            resolve([rid, resultPath])
        } catch (err) {
            reject(err)
        }
    })
}