// 导入router路由middleware
import router from 'koa-router'
import {getUsers} from "./usersAdminister/getUsers.js";
import {getRecordsInfo} from "./record/getRecordsInfo.js";
import {getRecordInfo} from "./record/getRecordInfo.js";
import fs from "fs";


export const RouterAPI = router()

RouterAPI.get('/api/user/', async (ctx) => {
    const { username } = ctx.session;
    // 如果没有log in，session里面不存在user
    if(username === undefined)
        ctx.body = { username: null }
    else ctx.body = { username: username }
})


RouterAPI.get('/api/users/', async (ctx) => {
    const { username } = ctx.session;
    if(username === "admin") {
        ctx.body = await getUsers()
    }
    else ctx.body = null
})

RouterAPI.get('/api/history/:tool/:user', async (ctx) => {
    ctx.body = await getRecordsInfo(ctx.params.tool,ctx.params.user)
})

RouterAPI.get('/api/result/:rid', async (ctx) => {
    const record = await getRecordInfo(ctx.params.rid)
    if(record.tool === "osha"){
        ctx.set('Content-disposition', 'attachment; filename=' + 'osha.subject.query.xlsx')
        ctx.body = fs.readFileSync(record.result_path + '/out/osha.subject.query.xlsx')
    } else if(record.tool === "sisco"){
        ctx.set('Content-disposition', 'attachment; filename=' + 'sisco.subject.siRNA.xlsx')
        ctx.body = fs.readFileSync(record.result_path + '/out/sisco.subject.siRNA.xlsx')
    }
})




