import Koa from 'koa'
import nextjs from 'next'
// import { parse } from 'url'
import bodyParser from 'koa-bodyparser'
// 导入koa router对象
import {Router} from './libs/koaRouters.js'
import {RouterAPI} from './libs/API-v1.0.0.js'
// session 有关模块
import session from "koa-session"



// Determine whether it is a production environment
const dev = process.env.NODE_ENV !== 'production'
// initialize nextjs instance and expose request handler
const app = nextjs(
    {
        dev,
        dir: "./frontend",
    }
)

export const handler = app.getRequestHandler()

app.prepare().then(() => {
    // create an object to present web server
    const server = new Koa()

    // set session
    server.keys = ['SECRET_KEY'];
    const CONFIG = {
        key: "koa.sess",   //cookie key (default is koa.sess)
        maxAge: 24 * 60 * 60 * 1000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
        autoCommit: true, // 自动提交到响应头。(默认是 true)
    };
    server.use(session(CONFIG, server));

    // add post body parser
    server.use(bodyParser());

    // use Koa router
    server.use(Router.routes())
    server.use(Router.allowedMethods())
    server.use(RouterAPI.routes())
    server.use(RouterAPI.allowedMethods())

    // for NextJs router 在koa路由中未定义的，将交给nextjs路由继续处理
    server.use(async (ctx) => {
        try{
            if (ctx.path === '/favicon.ico') return;
            //const { pathname, query } = parsedUrl
            // 传入Node原生的req对象，和res对象，因为Nextjs框架需要兼容许多基于Node封装的web框架
            // 让nextjs全局处理其他页面的http访问
            await handler(ctx.req, ctx.res)
            // 屏蔽koa中对response的内置处理，让nextjs来接手
            ctx.response = false
        } catch (err) {
            console.error('Error occurred handling', ctx.req.url, err)
            ctx.res.statusCode = 500
            ctx.res.end('internal server error')
        }
    })

    server.listen(3001, () => {
        console.log('server is running at http://localhost:3001')
    })
})

