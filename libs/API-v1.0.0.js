// 导入router路由middleware
import router from 'koa-router'
import {getGeneList} from "./mysql/getGeneList.js";


export const RouterAPI = router()

RouterAPI.get('/api/geneList/:searchFor/:keyword', async (ctx) => {
    ctx.body = await getGeneList(ctx.params.searchFor,ctx.params.keyword)
})




