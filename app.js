const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

const mongo = require('./mongodb/util.js');
const app = new Koa();
app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'
  }
}));
const router = new Router();

router.get('/hongbao/money.do', async (ctx, next) => {
  const db = await mongo.connect('mongodb://localhost:27017/prize');
  const result = await mongo.find(db, 'list', { name: 'mh' });
  await mongo.updateOne(db, 'list', { name: 'mh' }, { hasGot: true });
  db.close();
  const realResult = {
    code: 1,
    data: {
      name: result[0].name,
      amount: result[0].amount
    },
    msg: 'get prize success'

  }
  ctx.type = 'application/json; charset=utf-8'

  ctx.body = realResult;
});

router.get('/', async (ctx, next) => {
  // ctx.set('Cache-Control', 'no-cache');
  // ctx.status = 304;
  ctx.type = 'text/plain; charset=utf-8';
  // ctx.set({
  //   'Last-Modified': Date.now()
  // });
  await ctx.render('hello', {
    hello: 'hello world'
  });
});

router.get('/none', async (ctx, next) => {
  ctx.status = 302;
  ctx.redirect('/');
});


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);