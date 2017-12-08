const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
router.get('/', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('延时5000ms结束。');
      resolve(true);
    }, 5000);
  });
  ctx.body = {
    code: 1,
    data: {
      name: 'cp',
      amount: 1000,
      uuid: 718371939
    },
    msg: 'get coupon success!'
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3007);