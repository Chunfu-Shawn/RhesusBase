// 导入router路由middleware
import router from 'koa-router'
import {getGeneList} from "./mysql/getGeneList.js";
import {getEnsRNAID} from "./mysql/getEnsRNAID.js";
import {getThetaPiRhesus} from "./mysql/getThetaPiRhesus.js";
import {getThetaPiRhesusBackGround} from "./mysql/getThetaPiRhesusBackGround.js";


export const RouterAPI = router()

RouterAPI.get('/api/geneList/:searchFor/:keyword', async (ctx) => {
    ctx.body = await getGeneList(ctx.params.searchFor,ctx.params.keyword)
})

RouterAPI.get('/api/ensRNAID/:entrezID', async (ctx) => {
    ctx.body = await getEnsRNAID(ctx.params.entrezID)
})

RouterAPI.get('/api/thetaPiRhesus/:RNAIds', async (ctx) => {
    ctx.body = await getThetaPiRhesus(ctx.params.RNAIds)
})

RouterAPI.get('/api/thetaPiRhesusBackground', async (ctx) => {
    ctx.body = await getThetaPiRhesusBackGround()
})


