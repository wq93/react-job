require('./db') //链接数据库
const Koa = require('koa')
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const config = require('./common/config')
const router = require('./routes')
const path = require('path')
const serve = require('koa-static');
const response = require('./middlewares/response')
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const sendmsg = require('./controllers/sendmsg')
io.on('connection', socket => {
  console.log('socket.io is running...')
  socket.on('sendmsg', async data => {
    try {
      let result = await sendmsg(data)
      io.emit('recvmsg', Object.assign({}, result._doc))
    } catch (e) {
      io.emit('recvmsg', Object.assign({}, {msg: e}))
    }
  });
});

app.use(response)
  .use(bodyParser())// 解析请求体
  .use(router.routes()) // 路由分发
  .use(router.allowedMethods())
  .use((req, res, next) => {
    console.log(req, res, next)
  })
  // 1.主页静态网页 把静态页统一放到public中管理
  .use(serve(path.join(__dirname) + '/build/'))
server.listen(
  config.port, () => console.log(`listening on- port ${config.port}`))