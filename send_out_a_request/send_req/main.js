const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');

const app = new Koa();
const router = new Router();
router.get('/', async (ctx, next) => {
  const res = await axios.request({
    method: 'get',
    url: 'http://127.0.0.1:3007/',
    withCredentials: true,
    responseType: 'json'
  })
  .then(({ data }) => {
    return data;
  });
  ctx.type = 'text/application; charset=utf-8';
  ctx.body = res;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);