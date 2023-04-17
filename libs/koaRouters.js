import router from 'koa-router'
import {getPassword} from "./usersAdminister/getPassword.js";
import {getUsers} from "./usersAdminister/getUsers.js";
import {addAnUser} from "./usersAdminister/addAnUser.js";
import {changePassword} from "./usersAdminister/changePassword.js";
import {deleteAnUser} from "./usersAdminister/deleteAnUser.js";
import bcrypt from 'bcryptjs'
import authentication from "./authentication.js";
import {uploadFile} from "./uploadFile.js";
import {insertRecord} from "./record/insertRecord.js";
import {saveFasta} from "./saveFasta.js";
import {execScripts} from "./execScripts.js";
import {annotationLogger} from "./logSave.js";


export const Router = router()
// 设置路由，与next.js的路由进行映射

// 账号登入的验证
Router.post('/login/validate', async (ctx) => {
    // 管理员账号：admin rigerna_admin_2023
    const {username, password} = ctx.request.body
    const user = await getPassword(username)
    // 比较传过来的hash加密的密码和数据库中盐加密的密码
    if(bcrypt.compareSync(password, user.password)){
        ctx.session.username = user.username
        console.log("Log in " + ctx.session.username)
        //ctx.session.isLogin = true
        // 服务端在内存中保存session信息（包括user）
        //await ctx.session.save();
        ctx.response.status = 200;
        ctx.response.body = {signal: 'Log in successful!', user: user.username};
    }else {
        ctx.response.body = null
        ctx.response.status = 401;
    }
})

// 账号登出
Router.get('/logout', (ctx, next) => {
    console.log("Log out " + ctx.session.username)
    // 删除session 退出登陆
    ctx.body = {signal: 'Log out, good bye!', user: ctx.session.username};
    ctx.session = null;
})

// 账号管理的页面, 判断是否是admin
Router.get('/manage', async (ctx) => authentication(ctx,true))

// 账号注册的页面, 判断是否是admin
Router.get('/register', async (ctx) => authentication(ctx,true))

// 账号注册的验证
Router.post('/register/validate', async (ctx) => {
    const {username, password} = ctx.request.body
    const users =  await getUsers()
    let userExists = false
    users.forEach( item => {
        if(item.username === username)
            userExists = true
    })
    if(ctx.session.username === "admin" && userExists){
        ctx.response.status = 401
        ctx.response.body = null
    }else {
        // 盐加密
        const salt = bcrypt.genSaltSync(10);
        const bcryptPassword = bcrypt.hashSync(password, salt);
        await addAnUser(username, bcryptPassword)
        ctx.response.status = 200
        ctx.response.body = { signal: 'Register successfully', user: username }
    }
})


// 更改账号密码
Router.post('/change_password', async (ctx) => {
    const {username, password} = ctx.request.body
    if(ctx.session.username === "admin"){
        // 盐加密
        const salt = bcrypt.genSaltSync(10);
        const bcryptPassword = bcrypt.hashSync(password, salt);
        await changePassword(username, bcryptPassword)
        ctx.response.status = 200
        ctx.response.body = { signal: 'Change password successfully', user: username }
    }else {
        ctx.response.status = 401
        ctx.response.body = null
    }
})

// 删除账号
Router.post('/delete_user', async (ctx) => {
    if(ctx.session.username === "admin" && ctx.request.body.username !== "admin"){
        await deleteAnUser(ctx.request.body.username)
        ctx.response.status = 200
        ctx.response.body = { signal: 'Delete successfully', user: ctx.request.body.username }
    }else {
        ctx.response.status = 401
        ctx.response.body = null
    }
})

// 功能页面, 判断是否登录
Router.get('/osha', (ctx) => authentication(ctx,false))
Router.get('/sisco', (ctx) => authentication(ctx,false))
Router.get('/otos', (ctx) => authentication(ctx,false))
Router.get('/milos', (ctx) => authentication(ctx,false))
Router.get('/sider', (ctx) => authentication(ctx,false))

// 功能运行
Router.post('/osha/run',
    uploadFile("osha.query.xlsx").fields([
        {name: 'siRNAFile', maxCount: 1},
    ]),
    async (ctx) =>
    {
        // --param 前后保持空格
        const parameters = " --max_gap " + ctx.request.body.maxGap +
            " --max_mismatch " + ctx.request.body.maxMismatch
        const [rid, resultPath] = await insertRecord(ctx, "siRNAFile",parameters)
        ctx.body = {id: rid}
        const fasta = ctx.request.body.fasta
        const fastaFilePath = saveFasta(rid, fasta, resultPath)
        const queryFilePath = resultPath + '/osha.query.xlsx'
        const outputFilePath = resultPath + '/out/osha.subject.query.xlsx'
        let script = "python scripts/osha.py" +
            " --subject " + fastaFilePath +
            " --query " + queryFilePath +
            parameters +
            " --output " + outputFilePath
        await execScripts(rid, script, resultPath)
    }
)

Router.post('/sisco/run',
    uploadFile("sisco.siRNA.xlsx").fields([
        {name: 'oligoSeqFile', maxCount: 1},
    ]),
    async (ctx) =>
    {
        // --param 前后保持空格
        const parameters = " --length_ss " + ctx.request.body.lengthSS +
            " --length_as " + ctx.request.body.lengthAS +
            " --overhang " + `"${ctx.request.body.overhang}"` +
            " --length_ss_3 " + ctx.request.body.lengthSS3 +
            " --length_as_3 " + ctx.request.body.lengthAS3 +
            " --end_with " + ctx.request.body.end
        const [rid, resultPath] = await insertRecord(ctx, "oligoSeqFile",parameters)
        ctx.body = {id: rid}
        const fasta = ctx.request.body.fasta
        const fastaFilePath = saveFasta(rid, fasta, resultPath)
        const queryFilePath = resultPath + '/sisco.siRNA.xlsx'
        const outputFilePath = resultPath + '/out/sisco.subject.siRNA.xlsx'
        let script = "python scripts/sisco.py" +
            " --subject " + fastaFilePath +
            " --query " + queryFilePath +
            parameters +
            " --output " + outputFilePath
        await execScripts(rid, script, resultPath)
    }
)

Router.post('/otos/run',
    uploadFile("otos.siRNA.xlsx").fields([
        {name: 'oligoSeqFile', maxCount: 1},
    ]),
    async (ctx) =>
    {
        // --param 前后保持空格
        const parameters = " --length_ss " + ctx.request.body.lengthSS +
            " --length_as " + ctx.request.body.lengthAS +
            " --overhang " + `"${ctx.request.body.overhang}"` +
            " --length_ss_3 " + ctx.request.body.lengthSS3 +
            " --length_as_3 " + ctx.request.body.lengthAS3 +
            " --end_with " + ctx.request.body.end
        const [rid, resultPath] = await insertRecord(ctx, "oligoSeqFile",parameters)
        ctx.body = {id: rid}
        const queryFilePath = resultPath + '/otos.siRNA.xlsx'
        const outputFilePath = resultPath + '/out/otos.subject.siRNA.xlsx'
        let script = "python scripts/otos.py" +
            " --query " + queryFilePath +
            parameters +
            " --output " + outputFilePath
        await execScripts(rid, script, resultPath)
    })
Router.post('/milos/run',
    uploadFile("milos.siRNA.xlsx").fields([
        {name: 'oligoSeqFile', maxCount: 1},
    ]),
    async (ctx) =>
    {
        // --param 前后保持空格
        const parameters = " --length_ss " + ctx.request.body.lengthSS +
            " --length_as " + ctx.request.body.lengthAS +
            " --overhang " + `"${ctx.request.body.overhang}"` +
            " --length_ss_3 " + ctx.request.body.lengthSS3 +
            " --length_as_3 " + ctx.request.body.lengthAS3 +
            " --end_with " + ctx.request.body.end
        const [rid, resultPath] = await insertRecord(ctx, "oligoSeqFile",parameters)
        ctx.body = {id: rid}
        const queryFilePath = resultPath + '/sisco.siRNA.xlsx'
        const outputFilePath = resultPath + '/out/sisco.subject.siRNA.xlsx'
        let script = "python scripts/sisco.py" +
            " --query " + queryFilePath +
            parameters +
            " --output " + outputFilePath
        await execScripts(rid, script, resultPath)
    })

Router.post('/sider/run', async (ctx) =>
{
    // --param 前后保持空格
    const parameters = " --length_ss " + ctx.request.body.lengthSS +
        " --length_as " + ctx.request.body.lengthAS +
        " --overhang " + `"${ctx.request.body.overhang}"` +
        " --length_ss_3 " + ctx.request.body.lengthSS3 +
        " --length_as_3 " + ctx.request.body.lengthAS3 +
        " --end_with " + ctx.request.body.end
    const [rid, resultPath] = await insertRecord(ctx, "oligoSeqFile",parameters)
    ctx.body = {id: rid}
    const queryFilePath = resultPath + '/sisco.siRNA.xlsx'
    const outputFilePath = resultPath + '/out/sisco.subject.siRNA.xlsx'
    let script = "python scripts/sisco.py" +
        " --query " + queryFilePath +
        parameters +
        " --output " + outputFilePath
    await execScripts(rid, script, resultPath)
})